# Equibop [<img src="/static/icon.png" width="225" align="right" alt="Equibop">](https://github.com/Equicord/Equibop)

[![Equicord](https://img.shields.io/badge/Equicord-grey?style=flat)](https://github.com/Equicord/Equicord)
[![Tests](https://github.com/Equicord/Equibop/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/Equicord/Equibop/actions/workflows/test.yml)
[![Discord](https://img.shields.io/discord/1173279886065029291.svg?color=768AD4&label=Discord&logo=discord&logoColor=white)](https://equicord.org/discord)

Equibop is a fork of [Vesktop](https://github.com/Vencord/Vesktop).

You can join our [discord server](https://equicord.org/discord) for commits, changes, chat or even support.<br></br>
<<<<<<< HEAD

## Main features

=======

**Main features**:
- Equicord preinstalled
>>>>>>> upstream/main
- Much more lightweight and faster than the official Discord app
- Linux Screenshare with sound & wayland

**Extra included changes**

<<<<<<< HEAD
- Equicord preinstalled
- Custom Splash animations from [this PR](https://github.com/Vencord/Vesktop/pull/355)
- Tray Customization & Voice detection and Badge from [this PR](https://github.com/Vencord/Vesktop/pull/517)
- Global Keybind to Toggle voice status from [this PR](https://github.com/Vencord/Vesktop/pull/609)
- Custom Arguments from [this PR](https://github.com/Equicord/Equibop/pull/46)
- Remove (#) title prefix when Notification Badge option is toggled from [this PR](https://github.com/Vencord/Vesktop/pull/686)
- Allow patching video & audio devices into screen share from [this PR](https://github.com/Vencord/Vesktop/pull/195)

**Linux Note**:

- You can use the `--toggle-mic` & `--toggle-deafen` flags to toggle your microphone and deafen status from the terminal.

**Not fully Supported**:
<!-- not supported on windows yet lol -->
- Global Keybinds
=======
- Tray Customization with voice detection and notification badges
- Command-line flags to toggle microphone and deafen status (Linux)
- Custom Arguments from [this PR](https://github.com/Equicord/Equibop/pull/46)
- arRPC-bun with debug logging support https://github.com/Creationsss/arrpc-bun

**Linux Note**:

- You can use the `--toggle-mic` & `--toggle-deafen` flags to toggle your microphone and deafen status from the terminal. These can be bound to keyboard shortcuts at the system level.

**Not fully Supported**:
- Global Keybinds (Windows/macOS - use command-line flags on Linux instead)
>>>>>>> upstream/main

## Installing
Check the [Releases](https://github.com/Equicord/Equibop/releases) page

<<<<<<< HEAD
### Windows

If you don't know the difference, pick the Installer.

- Installer
  - [Universal](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win.exe)
  - [x64 / amd64](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win-x64.exe)
  - [Arm® 64](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win-arm64.exe)
- Portable
  - [x64 / amd64](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win-x64.zip)
  - [Arm® 64](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-win-arm64.zip)

### Mac

These work on both M Series and Intel Series Macs

- [DMG](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-mac-universal.dmg)
- [ZIP](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-mac-universal.zip)
=======
OR

Check The Downloads from the [website](https://equicord.org/downloads)
>>>>>>> upstream/main

### Linux

[![Equibop](https://img.shields.io/badge/AVAILABLE_ON_THE_AUR-333232?style=for-the-badge&logo=arch-linux&logoColor=0F94D2&labelColor=%23171717)](https://aur.archlinux.org/packages?O=0&K=equibop)
<br>
<<<<<<< HEAD
<a href="https://flathub.org/apps/io.github.equicord.equibop">
  <img src="https://flathub.org/api/badge?svg" alt="Download on Flathub" style="width:220px; height:auto;">
</a>

If you don't know the difference, pick amd64.

- amd64 / x86_64
  - [AppImage](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-x86_64.AppImage)
  - [Ubuntu/Debian (.deb)](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-amd64.deb)
  - [Fedora/RHEL (.rpm)](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-x86_64.rpm)
  - [tarball](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-x64.tar.gz)
- Arm® 64 / aarch64
  - [AppImage](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-arm64.AppImage)
  - [Ubuntu/Debian (.deb)](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-arm64.deb)
  - [Fedora/RHEL (.rpm)](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-aarch64.rpm)
  - [tarball](https://github.com/Equicord/Equibop/releases/latest/download/Equibop-linux-arm64.tar.gz)

#### Community packages

Below you can find unofficial packages created by the community. They are not officially supported by us, so before reporting issues, please first confirm the issue also happens on official builds. When in doubt, consult with their packager first. The flatpak and AppImage should work on any distro that [supports them](https://flatpak.org/setup/), so I recommend you just use those instead!
=======
<!-- <a href="https://flathub.org/apps/io.github.equicord.equibop">
  <img src="https://flathub.org/api/badge?svg" alt="Download on Flathub" style="width:220px; height:auto;">
</a> -->

#### Community packages

Below you can find unofficial packages created by the community. They are not officially supported by us, so before reporting issues, please first confirm the issue also happens on official builds. When in doubt, consult with their packager first. The AppImage should work on any distro that supports them, so I recommend you just use that instead!
>>>>>>> upstream/main

- Arch Linux: [Equibop on the Arch user repository](https://aur.archlinux.org/packages?K=equibop)
- NixOS: `nix-shell -p equibop`

## Building from Source

You need to have the following dependencies installed:

- [Git](https://git-scm.com/downloads)
- [Bun](https://bun.sh)

Packaging will create builds in the dist/ folder

> [!NOTE]
> On Windows, if you run the test script, you will get test errors about venmic, you can ignore these as it's a linux only module.

```sh
git clone https://github.com/Equicord/Equibop
cd Equibop

# Install Dependencies
bun install

# Either run it without packaging
bun start

# Or package (will build packages for your OS)
bun package

# Or only build the Linux Pacman package
bun package --linux pacman

# Or package to a directory only
bun package:dir
```

## Building LibVesktop from Source

This is a small C++ helper library Equibop uses on Linux to emit D-Bus events. By default, prebuilt binaries for x64 and arm64 are used.

If you want to build it from source:
1. Install build dependencies:
    - Debian/Ubuntu: `apt install build-essential python3 curl pkg-config libglib2.0-dev`
    - Fedora: `dnf install @c-development @development-tools python3 curl pkgconf-pkg-config glib2-devel`
2. Run `bun buildLibVesktop`
3. From now on, building Equibop will use your own build
