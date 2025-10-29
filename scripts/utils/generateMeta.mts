/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { promises as fs } from "node:fs";
import { mkdir } from "node:fs/promises";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import xmlFormat from "xml-formatter";

function generateDescription(description: string, descriptionNode: Element) {
    const lines = description.replace(/\r/g, "").split("\n");
    let currentList: Element | null = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("New Contributors")) {
            break;
        }
        if (line.startsWith("## ")) {
            const pNode = descriptionNode.ownerDocument.createElement("p");
            pNode.textContent = line.slice(3);
            descriptionNode.appendChild(pNode);
        } else if (line.startsWith("* ")) {
            const liNode = descriptionNode.ownerDocument.createElement("li");
            liNode.textContent = line.slice(2).split("in https://github.com")[0].trim();
            if (!currentList) {
                currentList = descriptionNode.ownerDocument.createElement("ul");
            }
            currentList.appendChild(liNode);
        }
        if (currentList && !lines[i + 1].startsWith("* ")) {
            descriptionNode.appendChild(currentList);
            currentList = null;
        }
    }
}

<<<<<<< HEAD:scripts/utils/updateMeta.mts
const latestReleaseInformation = await fetch("https://api.github.com/repos/Equicord/Equibop/releases/latest", {
=======
const releases = await fetch("https://api.github.com/repos/Equicord/Equibop/releases", {
>>>>>>> upstream/main:scripts/utils/generateMeta.mts
    headers: {
        Accept: "application/vnd.github+json",
        "X-Github-Api-Version": "2022-11-28"
    }
}).then(res => res.json());

<<<<<<< HEAD:scripts/utils/updateMeta.mts
const metaInfo = await fs.readFile("./meta/io.github.equicord.equibop.metainfo.xml", "utf-8");
=======
const latestReleaseInformation = releases[0];

const metaInfo = await (async () => {
    for (const release of releases) {
        const metaAsset = release.assets.find((a: any) => a.name === "org.equicord.equibop.metainfo.xml");
        if (metaAsset) return fetch(metaAsset.browser_download_url).then(res => res.text());
    }
})();

if (!metaInfo) {
    throw new Error("Could not find existing meta information from any release");
}
>>>>>>> upstream/main:scripts/utils/generateMeta.mts

const parser = new DOMParser().parseFromString(metaInfo, "text/xml");
const releaseList = parser.getElementsByTagName("releases")[0];

for (let i = 0; i < releaseList.childNodes.length; i++) {
    const release = releaseList.childNodes[i] as Element;
<<<<<<< HEAD:scripts/utils/updateMeta.mts

    if (release.nodeType === 1 && release.getAttribute("version") === `v${latestReleaseInformation.name}`) {
=======
    if (release.nodeType === 1 && release.getAttribute("version") === latestReleaseInformation.name) {
>>>>>>> upstream/main:scripts/utils/generateMeta.mts
        console.log("Latest release already added, nothing to be done");
        process.exit(0);
    }
}

const release = parser.createElement("release");
release.setAttribute("version", `v${latestReleaseInformation.name}`);
release.setAttribute("date", latestReleaseInformation.published_at.split("T")[0]);
release.setAttribute("type", "stable");

const releaseUrl = parser.createElement("url");
releaseUrl.textContent = latestReleaseInformation.html_url;
release.appendChild(releaseUrl);

const description = parser.createElement("description");
generateDescription(latestReleaseInformation.body, description);
release.appendChild(description);

releaseList.insertBefore(release, releaseList.childNodes[0]);

const output = xmlFormat(new XMLSerializer().serializeToString(parser), {
    lineSeparator: "\n",
    collapseContent: true,
    indentation: "  "
});

<<<<<<< HEAD:scripts/utils/updateMeta.mts
await fs.writeFile("./meta/io.github.equicord.equibop.metainfo.xml", output, "utf-8");
=======
await mkdir("./dist", { recursive: true });
await fs.writeFile("./dist/org.equicord.equibop.metainfo.xml", output, "utf-8");
console.log("Updated meta information written to ./dist/org.equicord.equibop.metainfo.xml");
>>>>>>> upstream/main:scripts/utils/generateMeta.mts
