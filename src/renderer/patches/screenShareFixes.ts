/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@vencord/types/utils";
import { currentSettings } from "renderer/components/ScreenSharePicker";
import { State } from "renderer/settings";
import { isLinux } from "renderer/utils";

const logger = new Logger("VesktopStreamFixes");

const original = navigator.mediaDevices.getDisplayMedia;

interface OverrideDevices {
    audio: string | undefined;
    video: string | undefined;
}

let overrideDevices: OverrideDevices = { audio: undefined, video: undefined };

export const patchOverrideDevices = (newOverrideDevices: OverrideDevices) => {
    overrideDevices = newOverrideDevices;
};

async function getVirtmic() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevice = devices.find(({ label }) => label === "vencord-screen-share");
        return audioDevice?.deviceId;
    } catch (error) {
        return null;
    }
}

navigator.mediaDevices.getDisplayMedia = async function (opts) {
    const stream = await original.call(this, opts);

    if (overrideDevices.audio) {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: { exact: overrideDevices.audio },
                autoGainControl: false,
                echoCancellation: false,
                noiseSuppression: false
            }
        });

        stream.getAudioTracks().forEach(t => {
            t.stop();
            stream.removeTrack(t);
        });

        audio.getAudioTracks().forEach(t => {
            stream.addTrack(t);
        });
    }

    if (overrideDevices.video) {
        const video = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: { exact: overrideDevices.video }
            }
        });

        stream.getVideoTracks().forEach(t => {
            t.stop();
            stream.removeTrack(t);
        });

        video.getVideoTracks().forEach(t => {
            stream.addTrack(t);
        });
    }

    if (isLinux) {
        const id = await getVirtmic();

        const frameRate = Number(State.store.screenshareQuality?.frameRate ?? 30);
        const height = Number(State.store.screenshareQuality?.resolution ?? 720);
        const width = Math.round(height * (16 / 9));
        const track = stream.getVideoTracks()[0];

        track.contentHint = String(currentSettings?.contentHint);

        const constraints = {
            ...track.getConstraints(),
            frameRate: { min: frameRate, ideal: frameRate },
            width: { min: 640, ideal: width, max: width },
            height: { min: 480, ideal: height, max: height },
            advanced: [{ width: width, height: height }],
            resizeMode: "none"
        };

        track
            .applyConstraints(constraints)
            .then(() => {
                logger.info("Applied constraints successfully. New constraints: ", track.getConstraints());
            })
            .catch(e => logger.error("Failed to apply constraints.", e));

        if (id) {
            const audio = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: {
                        exact: id
                    },
                    autoGainControl: false,
                    echoCancellation: false,
                    noiseSuppression: false,
                    channelCount: 2,
                    sampleRate: 48000,
                    sampleSize: 16
                }
            });

            stream.getAudioTracks().forEach(t => stream.removeTrack(t));
            stream.addTrack(audio.getAudioTracks()[0]);
        }
    }

    return stream;
};
