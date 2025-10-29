/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./settings.css";

import { classNameFactory } from "@equicord/types/api/Styles";
import { Divider, ErrorBoundary } from "@equicord/types/components";
import { Text } from "@equicord/types/webpack/common";
import { ComponentType } from "react";
import { Settings, useSettings } from "renderer/settings";
import { isLinux, isMac, isWindows } from "renderer/utils";

import { Arguments } from "./Arguments";
import { AutoStartToggle } from "./AutoStartToggle";
import { CustomSplashAnimation } from "./CustomSplashAnimation";
import { DeveloperOptionsButton } from "./DeveloperOptions";
import { DiscordBranchPicker } from "./DiscordBranchPicker";
import { NotificationBadgeToggle } from "./NotificationBadgeToggle";
<<<<<<< HEAD
import {
    CustomizeTraySwitch,
    TrayColorTypeSelect,
    TrayFillColorSwitch,
    TrayIconPicker,
    TraySwitch
} from "./TraySettings";
=======
import { Updater } from "./Updater";
import { UserAssetsButton } from "./UserAssets";
>>>>>>> upstream/main
import { VesktopSettingsSwitch } from "./VesktopSettingsSwitch";
import { WindowsTransparencyControls } from "./WindowsTransparencyControls";
interface BooleanSetting {
    key: keyof typeof Settings.store;
    title: string;
    description: string;
    defaultValue: boolean;
    disabled?(): boolean;
    invisible?(): boolean;
}

export const cl = classNameFactory("vcd-settings-");

export type SettingsComponent = ComponentType<{ settings: typeof Settings.store }>;

const SettingsOptions: Record<string, Array<BooleanSetting | SettingsComponent>> = {
    "Discord Branch": [DiscordBranchPicker],
    "System Startup & Performance": [
        AutoStartToggle,
        {
            key: "hardwareAcceleration",
            title: "Hardware Acceleration",
            description: "Enable hardware acceleration",
            defaultValue: true
        },
        {
            key: "hardwareVideoAcceleration",
            title: "Video Hardware Acceleration",
            description:
                "Enable hardware video acceleration. This can improve performance of screenshare and video playback, but may cause graphical glitches and infinitely loading streams.",
            defaultValue: false,
            disabled: () => Settings.store.hardwareAcceleration === false
        }
    ],
    "User Interface": [
        {
            key: "customTitleBar",
            title: "Discord Titlebar",
            description: "Use Discord's custom title bar instead of the native system one. Requires a full restart.",
            defaultValue: isWindows
        },
        {
            key: "staticTitle",
            title: "Static Title",
            description: 'Makes the window title "Equibop" instead of changing to the current page',
            defaultValue: false
        },
        {
            key: "enableMenu",
            title: "Enable Menu Bar",
            description: "Enables the application menu bar. Press ALT to toggle visibility.",
            defaultValue: false,
            disabled: () => Settings.store.customTitleBar ?? isWindows
        },
        {
            key: "enableSplashScreen",
            title: "Enable Splash Screen",
            description:
                "Shows a small splash screen while Equibop is loading. Disabling this option will show the main window earlier while it's still loading.",
            defaultValue: true
        },
        {
            key: "splashTheming",
            title: "Splash theming",
            description: "Adapt the splash window colors to your custom theme",
            defaultValue: true
        },
        {
            key: "splashProgress",
            title: "Show progress bar in Splash",
            description: "Adds a fancy progress bar to the splash window",
            defaultValue: false
        },
        WindowsTransparencyControls,
        UserAssetsButton
    ],
<<<<<<< HEAD
    Tray: [
        TraySwitch,
        CustomizeTraySwitch,
        TrayColorTypeSelect,
        TrayIconPicker,
        TrayFillColorSwitch,
=======
    Behaviour: [
        Arguments,
        {
            key: "tray",
            title: "Tray Icon",
            description: "Add a tray icon for Equibop",
            defaultValue: true,
            invisible: () => isMac
        },
>>>>>>> upstream/main
        {
            key: "minimizeToTray",
            title: "Minimize to tray",
            description: "Hitting X will make Equibop minimize to the tray instead of closing",
            defaultValue: true,
            invisible: () => isMac || Settings.store.tray === false
        },
        {
            key: "clickTrayToShowHide",
            title: "Hide/Show on tray click",
            description: "Left clicking tray icon will toggle the equibop window visibility.",
<<<<<<< HEAD
            defaultValue: false,
            invisible: () => Settings.store.tray === false
        }
    ],
    Behaviour: [
        Arguments,
=======
            defaultValue: false
        },
>>>>>>> upstream/main
        {
            key: "disableMinSize",
            title: "Disable minimum window size",
            description: "Allows you to make the window as small as your heart desires",
            defaultValue: false
        },
        {
            key: "disableSmoothScroll",
            title: "Disable smooth scrolling",
            description: "Disables smooth scrolling",
            defaultValue: false
        }
    ],
    Notifications: [NotificationBadgeToggle],
    Miscellaneous: [
        {
            key: "middleClickAutoscroll",
            title: "Middle Click Autoscroll",
            description: "Enables middle-click scrolling (Requires a full restart)",
            defaultValue: false,
            invisible: () => isLinux
        },
        {
            key: "arRPC",
            title: "Rich Presence",
            description: "Enables Rich Presence via arRPC",
            defaultValue: false
        },
        {
            key: "arRPCDebug",
            title: "Rich Presence Debug Logging",
            description:
                "Enables detailed debug logging for arRPC (bun path detection, process spawning, IPC messages, etc.)",
            defaultValue: false,
            disabled: () => Settings.store.arRPC === false
        },

        {
            key: "openLinksWithElectron",
            title: "Open Links in app (experimental)",
<<<<<<< HEAD
            description: "Opens links in a new Equibop window instead of your web browser",
            defaultValue: false
        },

        {
            key: "splashProgress",
            title: "Show progress bar in Splash",
            description: "Adds a fancy progress bar to the splash window",
=======
            description: "Opens links in a new equibop window instead of your web browser",
>>>>>>> upstream/main
            defaultValue: false
        }
    ],
    "Custom Splash Animation": [CustomSplashAnimation],
    "Developer Options": [DeveloperOptionsButton]
};

function SettingsSections() {
    const Settings = useSettings();

    const sections = Object.entries(SettingsOptions).map(([title, settings], i, arr) => (
        <div key={title} className={cl("category")}>
            <Text variant="heading-lg/semibold" color="header-primary" className={cl("category-title")}>
                {title}
            </Text>

            <div className={cl("category-content")}>
                {settings.map(Setting => {
                    if (typeof Setting === "function") return <Setting settings={Settings} />;

                    const { defaultValue, title, description, key, disabled, invisible } = Setting;
                    if (invisible?.()) return null;

                    return (
                        <VesktopSettingsSwitch
                            title={title}
                            description={description}
                            value={Settings[key as any] ?? defaultValue}
                            onChange={v => (Settings[key as any] = v)}
                            disabled={disabled?.()}
                            key={key}
                        />
                    );
                })}
            </div>

            {i < arr.length - 1 && <Divider className={cl("category-divider")} />}
        </div>
    ));

    return <>{sections}</>;
}

export default ErrorBoundary.wrap(
    function SettingsUI() {
        return (
<<<<<<< HEAD
            <Forms.FormSection>
                {/* FIXME: Outdated type */}
                {/* @ts-expect-error Outdated type */}
                <Text variant="heading-xl/semibold" color="header-primary" className="vcd-settings-title">
                    Equibop Settings
=======
            <section>
                <Text variant="heading-xl/semibold" color="header-primary" className={cl("title")}>
                    Vesktop Settings
>>>>>>> upstream/main
                </Text>
                <Updater />
                <SettingsSections />
            </section>
        );
    },
    {
        message:
<<<<<<< HEAD
            "Failed to render the Equibop Settings tab. If this issue persists, try to right click the Equibop tray icon, then click 'Repair Vencord'. And make sure your Equibop is up to date."
=======
            "Failed to render the Equibop Settings tab. If this issue persists, try to right click the Equibop tray icon, then click 'Repair Equicord'. And make sure your Equibop is up to date."
>>>>>>> upstream/main
    }
);
