/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { Rectangle } from "electron";

export interface Settings {
    discordBranch?: "stable" | "canary" | "ptb";
    transparencyOption?: "none" | "mica" | "tabbed" | "acrylic";
    tray?: boolean;
    trayColor?: string;
    trayColorType?: "default" | "system" | "custom";
    trayAutoFill?: "auto" | "white" | "black";
    trayMainOverride?: boolean;
    trayIdleOverride?: boolean;
    trayMutedOverride?: boolean;
    traySpeakingOverride?: boolean;
    trayDeafenedOverride?: boolean;
    minimizeToTray?: boolean;
<<<<<<< HEAD
=======
    autoStartMinimized?: boolean;
>>>>>>> upstream/main
    middleClickAutoscroll?: boolean;
    openLinksWithElectron?: boolean;
    staticTitle?: boolean;
    enableMenu?: boolean;
    disableSmoothScroll?: boolean;
    hardwareAcceleration?: boolean;
    hardwareVideoAcceleration?: boolean;
    arRPC?: boolean;
    arRPCDebug?: boolean;
    appBadge?: boolean;
    badgeOnlyForMentions?: boolean;
    disableMinSize?: boolean;
    clickTrayToShowHide?: boolean;
    customTitleBar?: boolean;
    arguments?: string;

    enableSplashScreen?: boolean;
    splashTheming?: boolean;
    splashColor?: string;
    splashAnimationPath?: string;
    splashBackground?: string;
    splashProgress?: boolean;
<<<<<<< HEAD
=======
    splashPixelated?: boolean;
>>>>>>> upstream/main

    spellCheckLanguages?: string[];

    audio?: {
        workaround?: boolean;

        deviceSelect?: boolean;
        granularSelect?: boolean;

        ignoreVirtual?: boolean;
        ignoreDevices?: boolean;
        ignoreInputMedia?: boolean;

        onlySpeakers?: boolean;
        onlyDefaultSpeakers?: boolean;
    };
}

export interface State {
    maximized?: boolean;
    minimized?: boolean;
    windowBounds?: Rectangle;

    firstLaunch?: boolean;

    steamOSLayoutVersion?: number;
    linuxAutoStartEnabled?: boolean;

    equicordDir?: string;
<<<<<<< HEAD
=======

    updater?: {
        ignoredVersion?: string;
        snoozeUntil?: number;
    };
>>>>>>> upstream/main
}
