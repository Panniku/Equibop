/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@equicord/types/utils";
import { findLazy, findStoreLazy, onceReady } from "@equicord/types/webpack";
import { FluxDispatcher, InviteActions } from "@equicord/types/webpack/common";
import { IpcCommands } from "shared/IpcEvents";

import { onIpcCommand } from "./ipcCommands";
import { Settings } from "./settings";

const logger = new Logger("EquibopRPC", "#5865f2");
const StreamerModeStore = findStoreLazy("StreamerModeStore");

// handle STREAMERMODE separately from regular RPC activities
VesktopNative.arrpc.onStreamerModeDetected(async jsonData => {
    if (!Settings.store.arRPC) return;

    try {
        await onceReady;

        const data = JSON.parse(jsonData);
        if (Settings.store.arRPCDebug) {
            logger.info("STREAMERMODE detected:", data);
            logger.info("StreamerModeStore.autoToggle:", StreamerModeStore.autoToggle);
        }

        if (data.socketId === "STREAMERMODE" && StreamerModeStore.autoToggle) {
            if (Settings.store.arRPCDebug) {
                logger.info("Toggling streamer mode to:", data.activity?.application_id === "STREAMERMODE");
            }
            FluxDispatcher.dispatch({
                type: "STREAMER_MODE_UPDATE",
                key: "enabled",
                value: data.activity?.application_id === "STREAMERMODE"
            });
        }
    } catch (e) {
        logger.error("Failed to handle STREAMERMODE:", e);
    }
});

onIpcCommand(IpcCommands.RPC_ACTIVITY, async jsonData => {
    if (!Settings.store.arRPC) return;

    await onceReady;

    const plugin = Vencord.Plugins.plugins["arRPC-bun"];
    if (plugin?.handleEvent && Vencord.Plugins.isPluginEnabled("arRPC-bun")) {
        plugin.handleEvent(new MessageEvent("message", { data: jsonData }));
    }
});

onIpcCommand(IpcCommands.RPC_INVITE, async code => {
    const { invite } = await InviteActions.resolveInvite(code, "Desktop Modal");
    if (!invite) return false;

    VesktopNative.win.focus();

    FluxDispatcher.dispatch({
        type: "INVITE_MODAL_OPEN",
        invite,
        code,
        context: "APP"
    });

    return true;
});

const { DEEP_LINK } = findLazy(m => m.DEEP_LINK?.handler);

onIpcCommand(IpcCommands.RPC_DEEP_LINK, async data => {
    logger.debug("Opening deep link:", data);
    try {
        DEEP_LINK.handler({ args: data });
        return true;
    } catch (err) {
        logger.error("Failed to open deep link:", err);
        return false;
    }
});
