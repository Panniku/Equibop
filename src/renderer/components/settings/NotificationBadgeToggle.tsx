/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { setBadge } from "renderer/appBadge";

import { SettingsComponent } from "./Settings";
import { VesktopSettingsSwitch } from "./VesktopSettingsSwitch";

export const NotificationBadgeToggle: SettingsComponent = ({ settings }) => {
    return (
        <>
            <VesktopSettingsSwitch
                title="Notification Badge"
                description="Show mention badge on the app icon"
                value={settings.appBadge ?? true}
                onChange={v => {
                    settings.appBadge = v;
                    if (v) setBadge();
                    else VesktopNative.app.setBadgeCount(0);
                }}
            />
            {settings.appBadge !== false && (
                <VesktopSettingsSwitch
                    title="Badge Only for Mentions"
                    description="Show badge only for pings/mentions, not for unread messages"
                    value={settings.badgeOnlyForMentions ?? false}
                    onChange={v => {
                        settings.badgeOnlyForMentions = v;
                        setBadge();
                    }}
                />
            )}
        </>
    );
};
