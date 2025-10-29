/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BrowserWindow } from "electron";
import { join } from "path";
import { SplashProps } from "shared/browserWinProperties";
import { STATIC_DIR } from "shared/paths";

import { DATA_DIR } from "./constants";
import { Settings } from "./settings";
import { fileExistsAsync } from "./utils/fileExists";

<<<<<<< HEAD
export let splash: BrowserWindow;

const totalTasks = 12;
let doneTasks = 0;

export function createSplashWindow() {
    const { splashBackground, splashColor, splashTheming, splashAnimationPath, splashProgress } = Settings.store;

    splash = new BrowserWindow({
        ...SplashProps,
        icon: ICON_PATH,
        show: !process.argv.includes("--start-minimized"),
        width: 300,
=======
export let splash: BrowserWindow | undefined;
import { loadView } from "./vesktopStatic";

const totalTasks = 9;
let doneTasks = 0;

export async function createSplashWindow(startMinimized = false) {
    splash = new BrowserWindow({
        ...SplashProps,
        ...(process.platform === "win32" && { icon: join(STATIC_DIR, "icon.ico") }),
        show: !startMinimized,
>>>>>>> upstream/main
        webPreferences: {
            preload: join(__dirname, "splashPreload.js")
        }
    });

    loadView(splash, "splash.html");

<<<<<<< HEAD
=======
    const { splashBackground, splashColor, splashTheming, splashProgress, splashPixelated } = Settings.store;

>>>>>>> upstream/main
    if (splashTheming !== false) {
        if (splashColor) {
            const semiTransparentSplashColor = splashColor.replace("rgb(", "rgba(").replace(")", ", 0.2)");

            splash.webContents.insertCSS(`body { --fg: ${splashColor} !important }`);
            splash.webContents.insertCSS(`body { --fg-semi-trans: ${semiTransparentSplashColor} !important }`);
        }

        if (splashBackground) {
            splash.webContents.insertCSS(`body { --bg: ${splashBackground} !important }`);
        }
    }

<<<<<<< HEAD
    if (splashAnimationPath) {
        splash.webContents.executeJavaScript(`
            document.getElementById("animation").src = "splash-animation://img";
        `);
    } else {
        splash.webContents.insertCSS(`img {image-rendering: pixelated}`);
        splash.webContents.executeJavaScript(`
            document.getElementById("animation").src = "../troll.gif";
=======
    if (splashPixelated) {
        splash.webContents.insertCSS(`img { image-rendering: pixelated; }`);
    }

    if (splashPixelated) {
        splash.webContents.insertCSS(`img { image-rendering: pixelated; }`);
    }

    const customSplashPath = join(DATA_DIR, "userAssets", "splash");
    const hasCustomSplash = await fileExistsAsync(customSplashPath);

    if (!hasCustomSplash) {
        splash.webContents.insertCSS(`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
            }

            img {
                animation: spin 2s linear infinite;
            }
>>>>>>> upstream/main
        `);
    }

    if (splashProgress) {
        splash.webContents.executeJavaScript(`
            document.getElementById("progress-percentage").innerHTML = "${doneTasks}%";
        `);
    } else {
        splash.webContents.executeJavaScript(`
            document.getElementById("progress-section").style.display = "none";
        `);
    }

    return splash;
}

/**
 * Adds a new log count to the splash
 */
export function addSplashLog() {
<<<<<<< HEAD
    if (!splash.isDestroyed()) {
=======
    if (splash && !splash.isDestroyed()) {
>>>>>>> upstream/main
        doneTasks++;
        const percentage = Math.min(100, Math.round((doneTasks / totalTasks) * 100));
        splash.webContents.executeJavaScript(`
            document.getElementById("progress").style.width = "${percentage}%";
            document.getElementById("progress-percentage").innerHTML = "${percentage}%";
        `);
    }
}

/**
 * Returns the splash window
 */
export function getSplash() {
    return splash;
}

export function updateSplashMessage(message: string) {
    if (splash && !splash.isDestroyed()) splash.webContents.send("update-splash-message", message);
}
