/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { exec } from "child_process";
import { app } from "electron";
import { BrowserWindow } from "electron/main";
import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { SplashProps } from "shared/browserWinProperties";
import { STATIC_DIR } from "shared/paths";

import { autoStart } from "./autoStart";
import { DATA_DIR } from "./constants";
import { createWindows, getAccentColor } from "./mainWindow";
import { Settings, State } from "./settings";
import { makeLinksOpenExternally } from "./utils/makeLinksOpenExternally";
import { loadView } from "./vesktopStatic";

interface Data {
    discordBranch: "stable" | "canary" | "ptb";
    minimizeToTray?: "on";
    autoStart?: "on";
    importSettings?: "on";
    richPresence?: "on";
}

export function createFirstLaunchTour() {
    if (process.platform === "darwin") {
        exec(`codesign --force --deep --sign - /Applications/Equibop.app`, error => {
            if (error) return;
        });
    }
    const win = new BrowserWindow({
        ...SplashProps,
        transparent: false,
        frame: true,
        autoHideMenuBar: true,
        ...(process.platform === "win32" && { icon: join(STATIC_DIR, "icon.ico") }),
        height: 470,
        width: 550
    });

    makeLinksOpenExternally(win);

    loadView(win, "first-launch.html");
    win.webContents.addListener("console-message", (_e, _l, msg) => {
        if (msg === "cancel") return app.exit();

        if (!msg.startsWith("form:")) return;
        const data = JSON.parse(msg.slice(5)) as Data;

        console.log(data);
        State.store.firstLaunch = false;
        Settings.store.discordBranch = data.discordBranch;
        Settings.store.tray = true;
        getAccentColor().then(color => {
            if (color) {
                Settings.store.trayColor = color.slice(1);
            } else {
                Settings.store.trayColor = "F6BFAC";
            }
        });
        Settings.store.minimizeToTray = !!data.minimizeToTray;
        Settings.store.arRPC = !!data.richPresence;

        if (data.autoStart) autoStart.enable();

        if (data.importSettings) {
            const from = join(app.getPath("userData"), "..", "Equicord", "settings");
            const to = join(DATA_DIR, "settings");
            try {
                const files = readdirSync(from);
                mkdirSync(to, { recursive: true });

                for (const file of files) {
                    copyFileSync(join(from, file), join(to, file));
                }
            } catch (e) {
                if (e instanceof Error && "code" in e && e.code === "ENOENT") {
                    console.log("No Vencord settings found to import.");
                } else {
                    console.error("Failed to import Vencord settings:", e);
                }
            }
        }

        win.close();

        createWindows();
    });
}
