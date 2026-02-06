# Install Nothing 🎭

[![npm version](https://img.shields.io/npm/v/install-nothing.svg)](https://www.npmjs.com/package/install-nothing)
[![npm downloads](https://img.shields.io/npm/dm/install-nothing.svg)](https://www.npmjs.com/package/install-nothing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)](https://nodejs.org/)

An endless fake installer with beautiful terminal output and customizable themes/styles. Perfect for pranks, demos, or just looking productively busy!

Supports **Windows**, **macOS**, and **Linux** with cross-platform configuration management, an interactive theme editor, and 7+ beautiful color themes.

**Version:** 1.1.0 | **License:** MIT | **Node:** >=12.0.0

---

## 📚 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
  - [Default Mode](#default-mode--use-saved-config)
  - [Interactive Mode](#interactive-mode---custom)
  - [Theme & Style Editor](#theme--style-editor)
  - [Configuration Management](#configuration-management)
  - [Environment Variables](#environment-variables)
- [NPM Scripts](#npm-scripts)
  - [Running the App](#running-the-app)
  - [By Theme](#by-theme)
  - [By Style](#by-style)
  - [Preset Combinations](#preset-combinations)
  - [Testing](#testing)
  - [Development](#development)
- [Configuration](#configuration)
  - [Config Locations by OS](#config-locations-by-os)
  - [Config File Format](#config-file-format)
- [Themes](#themes)
  - [System Themes](#system-themes)
  - [Creating Custom Themes](#creating-custom-themes)
- [Terminal Styles](#terminal-styles)
  - [Available Styles](#available-styles)
  - [Prompt Style Reference](#prompt-style-reference)
- [Theme Editor Guide](#theme-editor-guide)
  - [Interactive Theme Editor](#interactive-theme-editor)
  - [Creating Themes](#creating-themes)
  - [Editing Themes](#editing-themes)
  - [Managing Themes](#managing-themes)
- [ANSI Color Resources](#ansi-color-resources)
  - [Color Code Reference](#ansi-color-code-reference)
  - [Online Color Tools](#online-color-tools)
  - [Converting Colors](#converting-colors)
- [Project Structure](#project-structure)
- [Testing](#testing-guide)
  - [Running Tests](#running-tests)
  - [Test Coverage](#test-coverage)
- [Examples](#examples)
- [Command Reference](#command-reference)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [License](#license)
- [FAQ](#faq)
- [Support](#support)
- [Credits](#credits)

---

## ✨ Features

### 🎭 Core Features

- ✨ **Realistic Simulation** - Authentic Ubuntu apt-get update/install simulation
  - Real-looking package names and versions
  - Realistic output formatting
  - Actual Ubuntu repository URLs
  - Dependency resolution messages
  - Installation progress tracking

- 🎨 **7+ Beautiful Color Themes**
  - Dark Mode - Modern dark with cyan accents
  - Light Mode - Optimized for light terminals
  - Matrix - Classic green-on-black hacker aesthetic
  - Cyberpunk - Bright magenta/cyan neon
  - Retro - Monochrome yellow vintage look
  - Ocean - Blue and cyan calm theme
  - Sunset - Orange and pink warm theme
  - Unlimited custom themes via theme editor

- 💻 **6+ Terminal Prompt Styles**
  - Modern (ZSH/Powerline) - Fancy arrows and git info
  - Classic (Bash) - Traditional user@host:path$
  - Minimal - Clean single character >
  - Retro DOS - C:\SYSTEM> nostalgia
  - Fish Shell - Modern shell aesthetics
  - Powerline - Sleek segment separators

- 📊 **Animated Progress Bars**
  - Block character animations (█░)
  - Smooth transitions
  - Realistic stall at end
  - Multiple visual styles

- 🎪 **Randomized Output**
  - Different packages each run
  - Variable versions and sizes
  - Random repository selections
  - Unique installation sequences

### 💾 Configuration & Persistence

- 💾 **Persistent Configuration** - Preferences saved between runs
- 🎯 **Quick Mode** - Start instantly with `npm start`
- ⚙️ **Easy Customization** - Change themes anytime with `npm run run:interactive`
- 📍 **Platform-Aware Storage** - Respects OS conventions
- 🔄 **Reset & Defaults** - Reset anytime with `npm run run:reset`

### 🎨 Interactive Theme Editor

- 🖌️ **Create Themes** - Build custom themes from existing templates
- ✏️ **Edit Colors** - Modify individual color values with preview
- 📋 **Duplicate Themes** - Copy and customize existing themes
- 🗑️ **Manage Themes** - Delete custom themes (system themes protected)
- 🎭 **Live Preview** - See colors before saving
- 📊 **Color Browser** - View all available themes and colors

### 🖥️ Cross-Platform Support

- ✅ **Windows** - Config in `%APPDATA%\install-nothing\`
- ✅ **macOS** - Config in `~/Library/Application Support/install-nothing/`
- ✅ **Linux** - Config in `~/.config/install-nothing/` (XDG-compliant)
- 🌍 **Environment Variables** - Override settings on any platform
- 🔧 **Proper Path Handling** - Works with OS-native paths

### 🚀 Developer Friendly

- 📦 **Minimal Dependencies** - Only `prompts` package required
- ⚡ **Lightweight** - Fast startup, responsive CLI
- 🛠️ **Easy to Extend** - Add themes/styles via JSON
- 📁 **Standard Locations** - Follows OS conventions
- 🔧 **Modular Design** - Clean separation of concerns
- 🧪 **Comprehensive Tests** - 60+ unit and integration tests

---

## 📦 Installation

### Global Installation (Recommended)

Install globally to use `install-nothing` command from anywhere:

```bash
npm install -g install-nothing
```

Then use from any directory:

```bash
install-nothing
npm start
npm run dev
```

### Local Project Installation

Install in a specific project:

```bash
npm install install-nothing
```

Then run with:

```bash
npx install-nothing
npm run
```

### Verify Installation

Check that it's installed correctly:

```bash
npm run help
install-nothing --help
```

You should see the help menu.

---

## 🚀 Quick Start

Get started in 30 seconds:

```bash
# Run interactive setup (first time)
npm start

# Run with saved config (subsequent times)
npm start

# Choose a new theme
npm run run:interactive

# Create or edit themes
npm run run:edit

# View your configuration
npm run run:config
```

**Keyboard Controls:**
- **Arrow Keys** - Navigate menus
- **Enter** - Select option
- **Ctrl+C** - Stop installer / Exit menus

---

## 📖 Usage Guide

### Default Mode (Use Saved Config)

The simplest way to run Install Nothing:

```bash
npm start
npm run run
npm run run:default
```

#### First Run

On your first run, you'll be guided through interactive setup:

1. **Choose a Theme** - Select from 7 built-in themes
2. **Choose a Style** - Pick your preferred prompt style
3. **Enter Username** - Optional, defaults to system username
4. **Save Config** - Choice to save for future use

Your configuration is automatically saved to the appropriate location:
- **Windows:** `%APPDATA%\install-nothing\config.json`
- **macOS:** `~/Library/Application Support/install-nothing/config.json`
- **Linux:** `~/.config/install-nothing/config.json`

#### Subsequent Runs

```bash
$ npm start

Current Configuration:
  Theme:    Dark Mode
  Style:    Modern (ZSH/Powerline)
  Username: salimhankurul

? Use saved configuration? (Y/n) yes

Press Ctrl+C to stop the installer
```

Just press **Enter** or type **y** to start immediately with your saved theme!

### Interactive Mode (--custom)

Choose a new theme and style, even if you have a saved config:

```bash
npm run run:interactive
npm run run:custom
install-nothing --custom
```

**Perfect for:**
- Trying out new theme combinations
- Changing your default preferences
- Impressing friends with different looks
- Testing themes before saving

**Interactive flow:**
1. **Theme Selection** - Browse 7+ themes with descriptions
2. **Style Selection** - Pick your prompt style
3. **Username** - Set custom username
4. **Save Option** - Choose whether to save as default

### Theme & Style Editor

Create and customize themes directly from your terminal without editing JSON files:

```bash
npm run run:edit
npm run dev:edit
install-nothing --edit
install-nothing --customize
```

#### Editor Menu

```
? What would you like to do?
❯ List all themes        # Browse all available themes
  Create new theme       # Build a custom theme
  Edit existing theme    # Modify theme colors
  Duplicate theme        # Copy and customize
  Delete custom theme    # Remove themes
  Exit editor            # Leave editor
```

#### Features

- 📋 **List Themes** - View all themes with color previews
- ➕ **Create Theme** - New theme from existing template
- ✏️ **Edit Theme** - Modify individual color values
- 📋 **Duplicate Theme** - Copy and customize
- 🗑️ **Delete Theme** - Remove custom themes

### Configuration Management

#### View Saved Config (--config)

Display your currently saved configuration:

```bash
npm run run:config
install-nothing --config
```

**Example Output (Linux):**
```
Saved Configuration:

  Platform: Linux
  Location: /home/salimhankurul/.config/install-nothing/config.json
  Theme:    Dark Mode
  Style:    Modern (ZSH/Powerline)
  Username: salimhankurul
  Updated:  2026-02-06T10:30:45.123Z
```

**Example Output (macOS):**
```
Saved Configuration:

  Platform: macOS
  Location: /Users/salimhankurul/Library/Application Support/install-nothing/config.json
  Theme:    Dark Mode
  Style:    Modern (ZSH/Powerline)
  Username: salimhankurul
  Updated:  2026-02-06T10:30:45.123Z
```

**Example Output (Windows):**
```
Saved Configuration:

  Platform: Windows
  Location: C:\Users\salimhankurul\AppData\Roaming\install-nothing\config.json
  Theme:    Dark Mode
  Style:    Modern (ZSH/Powerline)
  Username: salimhankurul
  Updated:  2026-02-06T10:30:45.123Z
```

#### Reset Config (--reset)

Reset your configuration to defaults:

```bash
npm run run:reset
install-nothing --reset
```

**Output:**
```
✓ Configuration reset to defaults
  Removed: /home/salimhankurul/.config/install-nothing/config.json
```

After resetting, the next run will prompt for theme/style selection again.

#### View Help (--help)

See all available commands:

```bash
npm run help
npm run run:help
install-nothing --help
```

**Output:**
```
Install Nothing - Interactive CLI
Version 1.1.0 | Platform: Linux

Usage:
  install-nothing              # Run with last saved config
  install-nothing --custom     # Choose theme/style interactively
  install-nothing --edit       # Edit and create themes
  install-nothing --config     # Show saved config
  install-nothing --reset      # Reset to default config
  install-nothing --help       # Show this help

Examples:
  install-nothing                        # Use saved theme
  install-nothing --edit                 # Customize themes
  THEME=matrix install-nothing           # Override with env var
  install-nothing --custom               # Interactive selection
  install-nothing --reset                # Reset saved config

Configuration Location:
  /home/salimhankurul/.config/install-nothing/config.json
```

### Environment Variables

Override your configuration with environment variables:

```bash
THEME=matrix STYLE=classic npm start
THEME=cyberpunk STYLE=fish npm start
THEME=sunset STYLE=powerline npm start
```

**Supported Variables:**
- `THEME` - Override color theme
- `STYLE` - Override prompt style
- `USER` / `USERNAME` - Override username
- `XDG_CONFIG_HOME` - Custom config location (Linux only)

---

## 📋 NPM Scripts

### Running the App

```bash
# Start with saved config or interactive setup
npm start                    # Same as: node cli.js
npm run run                  # Explicit run command
npm run run:default          # Use saved configuration
npm run run:interactive      # Interactive theme/style selection
npm run run:custom           # Interactive selection (alias)
```

### Development

```bash
# Watch mode (auto-reloads on file changes)
npm run dev                  # nodemon --exec node cli.js
npm run dev:watch           # Explicit watch mode
npm run dev:dark            # Watch mode with Dark theme
npm run dev:matrix          # Watch mode with Matrix theme
npm run dev:cyberpunk       # Watch mode with Cyberpunk theme
npm run dev:edit            # Watch mode with theme editor
```

### Configuration Management

```bash
npm run run:config          # View saved configuration
npm run run:reset           # Reset configuration to defaults
npm run run:edit            # Open theme editor
npm run run:customize       # Open theme editor (alias)
npm run help                # Show help information
npm run run:help            # Show help (explicit)
```

### By Theme

```bash
npm run run:dark            # Run with Dark theme
npm run run:light           # Run with Light theme
npm run run:matrix          # Run with Matrix theme
npm run run:cyberpunk       # Run with Cyberpunk theme
npm run run:retro           # Run with Retro theme
npm run run:ocean           # Run with Ocean theme
npm run run:sunset          # Run with Sunset theme

# Or use the explicit theme: prefix
npm run run:theme:dark
npm run run:theme:light
npm run run:theme:matrix
npm run run:theme:cyberpunk
npm run run:theme:retro
npm run run:theme:ocean
npm run run:theme:sunset
```

### By Style

```bash
npm run run:modern          # Run with Modern style
npm run run:classic         # Run with Classic style
npm run run:minimal         # Run with Minimal style
npm run run:retro_dos       # Run with Retro DOS style
npm run run:fish            # Run with Fish Shell style
npm run run:powerline       # Run with Powerline style

# Or use the explicit style: prefix
npm run run:style:modern
npm run run:style:classic
npm run run:style:minimal
npm run run:style:retro_dos
npm run run:style:fish
npm run run:style:powerline
```

### Preset Combinations

Popular theme + style combinations:

```bash
npm run run:combo:matrix-classic       # Matrix theme + Classic Bash prompt
npm run run:combo:cyberpunk-fish       # Cyberpunk theme + Fish Shell prompt
npm run run:combo:dark-modern          # Dark theme + Modern ZSH prompt
npm run run:combo:ocean-minimal        # Ocean theme + Minimal prompt
npm run run:combo:sunset-powerline     # Sunset theme + Powerline prompt
npm run run:combo:retro-retro_dos      # Retro theme + Retro DOS prompt
npm run run:combo:light-classic        # Light theme + Classic Bash prompt
```

### Testing

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

```

---

## ⚙️ Configuration

### Config Locations by OS

Install Nothing respects platform conventions for configuration storage.

#### Windows

**Location:**
```
%APPDATA%\install-nothing\config.json
```

**Examples:**
- `C:\Users\salimhankurul\AppData\Roaming\install-nothing\config.json`
- `C:\Users\YourUsername\AppData\Roaming\install-nothing\config.json`

**To Access:**
```bash
# Open in File Explorer
explorer %APPDATA%\install-nothing

# Or view in Command Prompt
type %APPDATA%\install-nothing\config.json
```

#### macOS

**Location:**
```
~/Library/Application Support/install-nothing/config.json
```

**Examples:**
- `/Users/salimhankurul/Library/Application Support/install-nothing/config.json`
- `/Users/YourUsername/Library/Application Support/install-nothing/config.json`

**To Access:**
```bash
# Open in Finder
open ~/Library/Application\ Support/install-nothing

# Or view in Terminal
cat ~/Library/Application\ Support/install-nothing/config.json
```

#### Linux

**Location:**
```
~/.config/install-nothing/config.json
```

**Examples:**
- `/home/salimhankurul/.config/install-nothing/config.json`
- `/home/username/.config/install-nothing/config.json`

**To Access:**
```bash
# View config file
cat ~/.config/install-nothing/config.json

# Edit if needed
nano ~/.config/install-nothing/config.json

# Respects XDG_CONFIG_HOME
XDG_CONFIG_HOME=/custom/path npm start
```

### Config File Format

Your configuration is stored as JSON:

```json
{
  "theme": "dark",
  "style": "modern",
  "username": "salimhankurul",
  "lastUpdated": "2026-02-06T10:30:45.123Z"
}
```

**Fields:**
- `theme` - Selected color theme (key from themes.json)
- `style` - Selected prompt style (key from styles.json)
- `username` - Username displayed in fake installer
- `lastUpdated` - ISO timestamp of last change

**Note:** It's recommended to use CLI commands instead of manual editing. The theme editor handles JSON syntax automatically.

---

## 🎨 Themes

### System Themes

Install Nothing includes 7 beautiful pre-built themes. Custom themes can be added via the theme editor.

#### 1. Dark Mode 🌙

Modern dark mode with cyan accents. Best for dark terminals and night coding.

- **Primary:** Cyan (`\x1b[36m`)
- **Success:** Bright Green (`\x1b[92m`)
- **Error:** Bright Red (`\x1b[91m`)
- **Use Case:** General purpose, works on most terminals
- **Launch:** `npm run run:dark` or `THEME=dark npm start`

#### 2. Light Mode ☀️

Light mode optimized for light/white terminals. Perfect for bright environments.

- **Primary:** Blue (`\x1b[34m`)
- **Success:** Green (`\x1b[32m`)
- **Error:** Red (`\x1b[31m`)
- **Use Case:** Bright backgrounds, presentations
- **Launch:** `npm run run:light` or `THEME=light npm start`

#### 3. Matrix 🟢

Classic green-on-black hacker aesthetic. Iconic 90s Matrix-style vibes.

- **Primary:** Bright Green (`\x1b[92m`)
- **Success:** Bright Green (`\x1b[92m`)
- **Error:** Bright Red (`\x1b[91m`)
- **Use Case:** Fun, retro, pranks
- **Launch:** `npm run run:matrix` or `THEME=matrix npm start`

#### 4. Cyberpunk ⚡

Bright magenta/cyan neon vibes. Futuristic and eye-catching.

- **Primary:** Bright Magenta (`\x1b[95m`)
- **Success:** Bright Green (`\x1b[92m`)
- **Error:** Bright Red (`\x1b[91m`)
- **Use Case:** Modern, stylish, impressive demos
- **Launch:** `npm run run:cyberpunk` or `THEME=cyberpunk npm start`

#### 5. Retro 📺

Monochrome yellow (authentic old-school terminal). Nostalgic DOS-era look.

- **Primary:** Yellow (`\x1b[33m`)
- **Success:** Yellow (`\x1b[33m`)
- **Error:** Yellow (`\x1b[33m`)
- **Use Case:** Retro aesthetic, vintage vibes
- **Launch:** `npm run run:retro` or `THEME=retro npm start`

#### 6. Ocean 🌊

Blue and cyan theme. Calm, cool, and professional.

- **Primary:** Blue (`\x1b[34m`)
- **Success:** Cyan (`\x1b[36m`)
- **Error:** Bright Red (`\x1b[91m`)
- **Use Case:** Relaxing, professional environment
- **Launch:** `npm run run:ocean` or `THEME=ocean npm start`

#### 7. Sunset 🌅

Orange and pink warm theme. Cozy and warm colors.

- **Primary:** Orange (RGB)
- **Success:** Bright Green (`\x1b[92m`)
- **Error:** Bright Red (`\x1b[91m`)
- **Use Case:** Warm aesthetic, evening coding
- **Launch:** `npm run run:sunset` or `THEME=sunset npm start`

### Creating Custom Themes

Create unlimited custom themes with the interactive editor:

```bash
npm run run:edit
npm run dev:edit
```

Then select **"Create new theme"** and follow the prompts.

---

## 💻 Terminal Styles

### Available Styles

Choose how your prompt appears with 6 different styles.

### Prompt Style Reference

#### 1. Modern (ZSH/Powerline) ➜

ZSH Powerline-style prompt with fancy arrows and git info.

**Prompt Format:**
```
➜  ~ git:(master)
```

**Features:**
- Arrow character (➜) for visual appeal
- Git branch indicator
- Path display
- Modern and trendy
- Perfect for developers

**Launch:**
```bash
npm run run:modern
STYLE=modern npm start
npm run run:style:modern
```

#### 2. Classic (Bash) $

Traditional Bash prompt. Familiar and reliable.

**Prompt Format:**
```
username@hostname:~$
```

**Features:**
- Username display
- Hostname display
- Current path
- Traditional appearance
- Universal compatibility

**Launch:**
```bash
npm run run:classic
STYLE=classic npm start
npm run run:style:classic
```

#### 3. Minimal >

Minimalist single character. Clean and simple.

**Prompt Format:**
```
>
```

**Features:**
- Super clean
- Distraction-free
- Minimal visual footprint
- Modern minimalist style

**Launch:**
```bash
npm run run:minimal
STYLE=minimal npm start
npm run run:style:minimal
```

#### 4. Retro DOS >

Old DOS command prompt. Pure nostalgia.

**Prompt Format:**
```
C:\SYSTEM>
```

**Features:**
- DOS-era appearance
- Path in C:\ format
- Nostalgic computing vibes
- Unique retro look

**Launch:**
```bash
npm run run:retro_dos
STYLE=retro_dos npm start
npm run run:style:retro_dos
```

#### 5. Fish Shell ❯

Fish shell style with fancy arrows. Modern and colorful.

**Prompt Format:**
```
❯
```

**Features:**
- Fish shell aesthetics
- Fancy arrow character
- Modern appearance
- Clean minimalist look

**Launch:**
```bash
npm run run:fish
STYLE=fish npm start
npm run run:style:fish
```

#### 6. Powerline ⮚

Powerline segments with arrow separators. Sleek and modern.

**Prompt Format:**
```
~ ⮚
```

**Features:**
- Powerline aesthetic
- Segment separator
- Modern and polished
- Professional look

**Launch:**
```bash
npm run run:powerline
STYLE=powerline npm start
npm run run:style:powerline
```

---

## 🎨 Theme Editor Guide

The interactive theme editor allows you to create and customize themes without editing JSON files.

### Interactive Theme Editor

#### Launching the Editor

```bash
npm run run:edit
npm run dev:edit
install-nothing --edit
install-nothing --customize
```

#### Editor Menu

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          🎨  INSTALL NOTHING - THEME/STYLE EDITOR 🎨        ║
║                                                            ║
║         Create and customize themes and terminal styles    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

? What would you like to do?
❯ List all themes
  Create new theme
  Edit existing theme
  Duplicate theme
  Delete custom theme
  Exit editor
```

### Creating Themes

#### Step-by-Step: Create a New Theme

**Step 1: Launch Editor**
```bash
npm run run:edit
```

**Step 2: Select "Create new theme"**
```
? What would you like to do?
  List all themes
❯ Create new theme
  Edit existing theme
  Duplicate theme
  Delete custom theme
  Exit editor
```

**Step 3: Enter Theme Name**
```
? Theme name: My Custom Theme
```

**Step 4: Choose Display Name**
```
? Display name (for menu): My Custom Theme
```

**Step 5: Select Template Theme**
```
? Use an existing theme as template:
❯ Dark Mode
  Light Mode
  Matrix
  Cyberpunk
  Retro
  Ocean
  Sunset
```

**Step 6: Review and Confirm**
```
New Theme Preview:
  Key:          my_custom_theme
  Display Name: My Custom Theme
  Primary:      ■■■■■
  Success:      ■■■■■
  Error:        ■■■■■

? Create this theme? (Y/n) yes
✓ Theme "my_custom_theme" created successfully!
You can now use it with: THEME=my_custom_theme npm start
```

**Step 7: Use Your Theme**
```bash
THEME=my_custom_theme npm start
```

### Editing Themes

#### Step-by-Step: Edit an Existing Theme

**Step 1: Launch Editor**
```bash
npm run run:edit
```

**Step 2: Select "Edit existing theme"**
```
? What would you like to do?
  List all themes
  Create new theme
❯ Edit existing theme
  Duplicate theme
  Delete custom theme
  Exit editor
```

**Step 3: Choose Theme to Edit**
```
? Select a theme to edit:
❯ Dark Mode
  Light Mode
  Matrix
  Cyberpunk
  Retro
  Ocean
  Sunset
  my_custom_theme
```

**Step 4: View Current Colors**
```
Editing Theme: Dark Mode

Current color codes:
  reset                ■■■■■ \x1b[0m
  bright               ■■■■■ \x1b[1m
  dim                  ■■■■■ \x1b[2m
  primary              ■■■■■ \x1b[36m
  success              ■■■■■ \x1b[92m
  warning              ■■■■■ \x1b[93m
  error                ■■■■■ \x1b[91m
  info                 ■■■■■ \x1b[94m
  secondary            ■■■■■ \x1b[35m
  text                 ■■■■■ \x1b[37m
  muted                ■■■■■ \x1b[90m
  progress_fill        ■■■■■ \x1b[36m
  progress_empty       ■■■■■ \x1b[90m
```

**Step 5: Select Color to Edit**
```
? Select a color to edit:
  reset
  bright
  dim
❯ primary
  success
  warning
  error
  info
  secondary
  text
  muted
  progress_fill
  progress_empty
```

**Step 6: Enter New Color Code**
```
Note: Enter ANSI color codes (e.g., "\x1b[32m" for green)

? Enter ANSI color code for primary: \x1b[32m
? Save changes to Dark Mode? (Y/n) yes
✓ Theme updated successfully!
```

### Managing Themes

#### List All Themes

```bash
npm run run:edit
```

Select **"List all themes"** to see:
- All available themes
- Color previews for each
- Theme names and keys

#### Duplicate a Theme

```bash
npm run run:edit
```

Select **"Duplicate theme"** to:
1. Choose an existing theme
2. Give it a new name
3. Create an instant copy
4. Customize as needed

#### Delete Custom Themes

```bash
npm run run:edit
```

Select **"Delete custom theme"** to:
1. Choose a custom theme (system themes protected)
2. Confirm deletion
3. Remove it permanently

---

## 🌈 ANSI Color Resources

### ANSI Color Code Reference

When editing colors in the theme editor, use ANSI color codes in the format `\x1b[XXm`:

#### Standard Colors (30-37)
```
\x1b[30m  - Black
\x1b[31m  - Red
\x1b[32m  - Green
\x1b[33m  - Yellow
\x1b[34m  - Blue
\x1b[35m  - Magenta
\x1b[36m  - Cyan
\x1b[37m  - White
```

#### Bright/High Intensity (90-97)
```
\x1b[90m  - Bright Black (Gray)
\x1b[91m  - Bright Red
\x1b[92m  - Bright Green
\x1b[93m  - Bright Yellow
\x1b[94m  - Bright Blue
\x1b[95m  - Bright Magenta
\x1b[96m  - Bright Cyan
\x1b[97m  - Bright White
```

#### Style Codes
```
\x1b[0m   - Reset (returns to default)
\x1b[1m   - Bright/Bold
\x1b[2m   - Dim
```

#### 256 Color Mode (Advanced)
```
\x1b[38;5;Nm  - Foreground color (N = 0-255)
\x1b[48;5;Nm  - Background color (N = 0-255)
```

#### RGB Color Mode (24-bit, Advanced)
```
\x1b[38;2;R;G;Bm  - RGB foreground (R,G,B = 0-255)
\x1b[48;2;R;G;Bm  - RGB background (R,G,B = 0-255)
```

#### Useful Color Combinations
```
\x1b[1;31m - Bold Red
\x1b[1;32m - Bold Green
\x1b[1;33m - Bold Yellow
\x1b[1;34m - Bold Blue
\x1b[1;35m - Bold Magenta
\x1b[1;36m - Bold Cyan
\x1b[2;37m - Dim White
```

### Online Color Tools

Finding the perfect color is easy with these resources!

#### 🎨 Interactive Color Pickers

**1. Talyian ANSI Color Chart** ⭐ RECOMMENDED
- **URL:** https://talyian.github.io/ansi256/
- **Description:** Interactive visual 256-color palette with code generation
- **How to Use:**
  1. Click on any color in the grid
  2. See the ANSI code appear
  3. Copy code and use in theme editor
- **Best For:** Finding specific ANSI colors quickly
- **Features:** Click-to-copy, RGB display, hex values, live preview

**2. Chir.cat ANSI Color Explorer**
- **URL:** https://chir.cat/ansi/
- **Description:** Beautiful interactive ANSI color visualization
- **Features:** Color grid, names, all code formats, real-time preview
- **Best For:** Learning ANSI colors visually
- **Type:** Interactive Explorer

**3. Terminal.sexy**
- **URL:** https://terminal.sexy/
- **Description:** Design terminal color schemes with live preview
- **Features:** Visual editor, live preview, export, theme browser
- **Best For:** Seeing how colors look in a real terminal
- **Type:** Theme Designer

#### 🖌️ Palette & Theme Inspiration

**4. Coolors.co**
- **URL:** https://coolors.co/
- **Description:** Generate beautiful color palettes instantly
- **How to Use:**
  1. Press spacebar to generate new palettes
  2. Lock colors you like
  3. Note hex values
  4. Convert to ANSI using tools below
- **Best For:** Finding harmonious color combinations
- **Type:** Palette Generator

**5. Gogh - Terminal Color Schemes**
- **URL:** https://gogh-colors.github.io/
- **Description:** Database of 500+ terminal color schemes
- **Features:** Browse themes, live preview, download, color values
- **Best For:** Theme inspiration and existing schemes
- **Type:** Theme Database

**6. Adobe Color Wheel**
- **URL:** https://color.adobe.com/
- **Description:** Professional color harmony tools
- **Features:** Color rules, complementary schemes, color picker
- **Best For:** Creating professional-looking themes
- **Type:** Professional Tool

**7. iTerm2 Color Schemes**
- **URL:** https://iterm2colorschemes.com/
- **Description:** 100+ terminal color scheme presets
- **Features:** Live preview, RGB/hex values, download options
- **Best For:** Terminal-specific color inspiration
- **Type:** Theme Collection

#### 🔄 Color Format Converters

**8. Colorhexa**
- **URL:** https://www.colorhexa.com/
- **Description:** Hex color analyzer with full conversion
- **How to Use:**
  1. Enter hex color (e.g., #FF5733)
  2. Get RGB values
  3. Find closest ANSI colors
  4. View color schemes
- **Best For:** Converting favorite hex colors to ANSI
- **Type:** Converter & Analyzer

**9. RGB to ANSI Converter**
- **URL:** https://chir.cat/ansi/
- **Description:** Direct RGB to ANSI conversion
- **Best For:** Quick RGB to code conversion
- **Type:** Converter

#### 📚 Learning Resources

**10. Stack Overflow ANSI Guide**
- **URL:** https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
- **Description:** Community guide to ANSI escape sequences
- **Best For:** Understanding codes in depth
- **Type:** Educational

**11. Wikipedia ANSI Escape Code**
- **URL:** https://en.wikipedia.org/wiki/ANSI_escape_code
- **Description:** Complete technical reference
- **Best For:** Technical deep-dive
- **Type:** Technical Reference

### Quick Color Reference Table

Save this for quick lookup:

| Color   | Standard   | Bright     | RGB Example   | Hex     | Use Case   |
| ------- | ---------- | ---------- | ------------- | ------- | ---------- |
| Black   | `\x1b[30m` | `\x1b[90m` | (0,0,0)       | #000000 | Background |
| Red     | `\x1b[31m` | `\x1b[91m` | (205,49,49)   | #CD3131 | Errors     |
| Green   | `\x1b[32m` | `\x1b[92m` | (19,161,14)   | #13A10E | Success    |
| Yellow  | `\x1b[33m` | `\x1b[93m` | (229,229,16)  | #E5E510 | Warnings   |
| Blue    | `\x1b[34m` | `\x1b[94m` | (36,114,200)  | #2472C8 | Primary    |
| Magenta | `\x1b[35m` | `\x1b[95m` | (188,63,60)   | #BC3F3C | Accent     |
| Cyan    | `\x1b[36m` | `\x1b[96m` | (17,168,205)  | #11A8CD | Highlight  |
| White   | `\x1b[37m` | `\x1b[97m` | (204,204,204) | #CCCCCC | Text       |

### Converting Colors

#### Method 1: Using Talyian (Fastest)

```
1. Visit https://talyian.github.io/ansi256/
2. Browse the color grid
3. Click a color you like
4. Copy the ANSI code shown
5. Paste into npm run run:edit
```

#### Method 2: Converting from Hex

```
1. Find a hex color you like (#FF5733)
2. Visit https://www.colorhexa.com/
3. Paste the hex code
4. Note RGB values (e.g., 255, 87, 51)
5. Use in theme editor:
   \x1b[38;2;255;87;51m
   OR find closest on Talyian
```

#### Method 3: Using Color Palettes

```
1. Visit https://coolors.co/
2. Generate until you find colors you like
3. Note the hex values
4. Convert each using Colorhexa
5. Create your complete theme
```

#### Method 4: Adapting Existing Themes

```
1. Visit https://gogh-colors.github.io/
2. Find a theme you love
3. Note its color values
4. Look them up on Talyian
5. Adapt for your custom theme
```

### Pro Tips for Color Selection

🎯 **Color Choice Guidelines:**
- **Contrast** - Text must be readable on terminal background
- **Harmony** - Colors should work together
- **Mood** - Evoke the feeling you want
- **Accessibility** - Consider color blindness

🎨 **Theme Color Roles:**
- `primary` - Main accent (cyan, blue, green, magenta)
- `success` - Positive feedback (bright green)
- `error` - Alerts/errors (bright red)
- `warning` - Cautions (bright yellow)
- `text` - Main text (white, light gray)
- `muted` - Secondary text (gray)

⚡ **Color Mode Guide:**
- **Standard (30-37)** - Simple, best compatibility
- **Bright (90-97)** - More vibrant, good compatibility
- **256-Color (38;5;N)** - 256 options, good compatibility
- **RGB (38;2;R;G;B)** - Full spectrum, modern terminals

**Test Before Saving:**
```bash
npm run run:edit
# Create/edit your theme
# Then test it
THEME=your_theme npm start
```

### Bookmark These Tools!

Keep these tabs open while creating themes:

| Tool                         | URL                                |
| ---------------------------- | ---------------------------------- |
| **Talyian** (Main Pick)      | https://talyian.github.io/ansi256/ |
| **Colorhexa** (Converters)   | https://www.colorhexa.com/         |
| **Terminal.sexy** (Preview)  | https://terminal.sexy/             |
| **Coolors.co** (Inspiration) | https://coolors.co/                |
| **Chir.cat** (Explorer)      | https://chir.cat/ansi/             |

---

## 📁 Project Structure

Install Nothing uses a modular architecture with clear separation of concerns:

```
install-nothing/
├── cli.js                    # ⭐ Main entry point - handles all CLI commands
├── installer.js              # Core installer logic - runs the fake installation
├── package.json              # Project metadata and scripts
├── README.md                 # This file
├── LICENSE                   # MIT license
├── .gitignore                # Git ignore rules
├── .npmignore                # NPM ignore rules
├── .nodemonrc.json           # Nodemon configuration for dev watch mode
│
├── lib/                      # Utility modules
│   ├── config-manager.js      # Handles config save/load (cross-platform)
│   ├── config-manager.test.js # Config manager tests
│   ├── theme-editor.js        # Interactive theme editor
│   └── theme-editor.test.js   # Theme editor tests
│
├── config/                   # Configuration files (JSON)
│   ├── themes.json           # Color themes definitions
│   └── styles.json           # Terminal style definitions
│
├── __tests__/                # Integration and CLI tests
│   ├── integration.test.js   # Integration tests
│   |__ cli.test.js           # CLI command tests
│   
│
├── jest.config.js            # Jest testing configuration
├── helpers.js           # Test utilities and mock data
└── installer.test.js         # Installer module tests
```

### File Responsibilities

| File                    | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `cli.js`                | Entry point, argument parsing, user interaction |
| `installer.js`          | Fake installation simulation logic              |
| `lib/config-manager.js` | Config file management (save/load/reset)        |
| `lib/theme-editor.js`   | Interactive theme creation/editing              |
| `config/themes.json`    | Color schemes definitions                       |
| `config/styles.json`    | Prompt style definitions                        |
| `.nodemonrc.json`       | File watching configuration for development     |

---

## 🧪 Testing Guide

Install Nothing includes comprehensive test coverage with unit, integration, and CLI tests.

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

```

### Test Coverage

The test suite covers:

✅ **Config Manager** (`lib/config-manager.test.js`)
- Platform detection (Windows/macOS/Linux)
- Loading saved config
- Saving config
- Resetting config
- Error handling
- Cross-platform paths

✅ **Theme Editor** (`lib/theme-editor.test.js`)
- Loading themes
- Loading styles
- Saving themes
- Saving styles
- Error handling

✅ **Installer** (`installer.test.js`)
- Module exports
- Configuration loading
- Helper functions
- String generation (packages, versions)
- Async operations

✅ **Integration Tests** (`__tests__/integration.test.js`)
- Config file operations (create, read, update, delete)
- Cross-platform paths
- JSON file validation
- Environment variables
- File persistence

✅ **CLI Tests** (`__tests__/cli.test.js`)
- `--help` flag
- `-h` shorthand
- `--config` flag
- `--reset` flag
- Flag validation
- Environment variables

### Test Coverage Report

```bash
npm run test:coverage
```

Generates a detailed coverage report in `./coverage` directory.

Open the HTML report:
```bash
# macOS
open coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html

# Windows
start coverage/lcov-report/index.html
```

---

## 📚 Examples

### Example 1: First-Time Interactive Setup

```bash
$ npm start

╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           🎭  INSTALL NOTHING - INTERACTIVE CLI 🎭        ║
║                                                            ║
║    An endless fake installer with customizable themes      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

? Select a Theme:
  Dark Mode
  Light Mode
❯ Matrix
  Cyberpunk
  Retro
  Ocean
  Sunset

? Select a Terminal Style:
  Modern (ZSH/Powerline)
❯ Classic (Bash)
  Minimal
  Retro DOS
  Fish Shell
  Powerline

? Username (press Enter to use system username): salimhankurul

Summary:
  Theme:    Matrix
  Style:    Classic (Bash)
  Username: salimhankurul

? Save as default configuration? (Y/n) yes
✓ Configuration saved
  Platform: Linux
  Saved to: /home/salimhankurul/.config/install-nothing/config.json

Press Ctrl+C to stop the installer

salimhankurul@mainframe-prod-01:~$ sudo apt-get update
Reading package lists... Done
Building dependency tree...
Get:1 http://us.archive.ubuntu.com/ubuntu focal InRelease [265 kB]
Hit:2 http://security.ubuntu.com/ubuntu focal-security InRelease
Get:3 http://us.archive.ubuntu.com/ubuntu focal-updates InRelease [89.1 kB]
...
```

### Example 2: Quick Start with Saved Config

```bash
$ npm start

Current Configuration:
  Theme:    Matrix
  Style:    Classic (Bash)
  Username: salimhankurul

? Use saved configuration? (Y/n) yes

Press Ctrl+C to stop the installer

salimhankurul@mainframe-prod-01:~$ sudo apt-get update
```

### Example 3: Creating a Custom Theme

```bash
$ npm run run:edit

? What would you like to do?
❯ List all themes
  Create new theme
  Edit existing theme
  Duplicate theme
  Delete custom theme
  Exit editor

Select: Create new theme

? Theme name: Neon
? Display name (for menu): Neon Glow
? Use an existing theme as template:
❯ Dark Mode

New Theme Preview:
  Key:          neon
  Display Name: Neon Glow
  Primary:      ■■■■■
  Success:      ■■■■■
  Error:        ■■■■■

? Create this theme? (Y/n) yes
✓ Theme "neon" created successfully!
You can now use it with: THEME=neon npm start
```

### Example 4: Using Preset Combinations

```bash
# Cyberpunk theme + Fish Shell style
npm run run:combo:cyberpunk-fish

# Sunset theme + Powerline style
npm run run:combo:sunset-powerline

# Matrix theme + Classic Bash style
npm run run:combo:matrix-classic
```

### Example 5: Development with Watch Mode

```bash
# Auto-reloads when files change
npm run dev

# Watch mode with specific theme
npm run dev:dark
npm run dev:matrix
npm run dev:cyberpunk

# Watch mode with theme editor
npm run dev:edit
```

### Example 6: Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📋 Command Reference

### Main Commands

| Command        | Description              | Use Case             |
| -------------- | ------------------------ | -------------------- |
| `npm start`    | Run with saved config    | Default usage        |
| `npm run dev`  | Watch mode (auto-reload) | Development          |
| `npm run help` | Show help                | Learn commands       |
| `npm test`     | Run all tests            | Verify functionality |

### CLI Flags

| Flag                    | Description                 |
| ----------------------- | --------------------------- |
| `--help`, `-h`          | Show help menu              |
| `--custom`              | Interactive theme selection |
| `--edit`, `--customize` | Open theme editor           |
| `--config`              | Show saved config           |
| `--reset`               | Reset to defaults           |

### Environment Variables

| Variable          | Usage                       | Example                             |
| ----------------- | --------------------------- | ----------------------------------- |
| `THEME`           | Override theme              | `THEME=matrix npm start`            |
| `STYLE`           | Override style              | `STYLE=classic npm start`           |
| `USER`            | Override username (Unix)    | `USER=admin npm start`              |
| `USERNAME`        | Override username (Windows) | `USERNAME=admin npm start`          |
| `XDG_CONFIG_HOME` | Config location (Linux)     | `XDG_CONFIG_HOME=/custom npm start` |

---

## 🔧 Troubleshooting

### Installation Issues

**Problem:** `npm install -g install-nothing` fails

**Solution:**
```bash
# Try with sudo (not recommended)
sudo npm install -g install-nothing

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g install-nothing
```

### Config File Issues

**Problem:** Can't find config file

**Solution:**
```bash
npm run run:config
# Shows exact location on your system
```

**Problem:** Configuration was lost

**Solution:**
```bash
npm run run:reset
npm run run:interactive
```

### Theme/Style Issues

**Problem:** Theme not found error

**Solution:**
```bash
npm run run:edit
# List all themes to verify
# Or reset and reconfigure
npm run run:reset
npm start
```

**Problem:** Custom theme not showing

**Solution:**
```bash
npm run run:config
# Check if config location is accessible
npm run run:edit
# Recreate the theme
```

### Color Display Issues

**Problem:** Colors look wrong or don't display

**Solution:**
1. Update your terminal emulator to latest version
2. Check for 256 color or True Color support
3. Try a different theme:
   ```bash
   npm run run:dark
   npm run run:light
   npm run run:minimal
   ```
4. Try environment variable override:
   ```bash
   THEME=ocean npm start
   ```

### Watch Mode Issues

**Problem:** `npm run dev` doesn't auto-reload

**Solution:**
1. Install nodemon:
   ```bash
   npm install
   ```
2. Check `.nodemonrc.json` configuration
3. Ensure files are being saved to disk
4. Try explicit watch:
   ```bash
   npm run dev:watch
   ```

### Test Failures

**Problem:** Tests fail after updates

**Solution:**
```bash
# Clear cache and reinstall
npm cache clean --force
npm install

# Run tests again
npm test

# Or run with fresh setup
npm run test:ci
```

### Permission Issues

**Problem:** Permission denied on config save

**Solution (Linux/macOS):**
```bash
chmod -R u+w ~/.config/install-nothing
# or for macOS
chmod -R u+w ~/Library/Application\ Support/install-nothing
```

**Solution (Windows):**
- Run PowerShell as Administrator
- Or check folder permissions in File Explorer

### Cross-Platform Issues

**Problem:** Works on Windows but not macOS/Linux

**Solution:**
```bash
# Use explicit paths
npm run run:config
# Check the config location

# Test with environment variables
THEME=dark npm start

# Reset and reconfigure
npm run run:reset
npm start
```

---

## 📝 Changelog

### Version 1.1.0 (Current) - Theme Editor Release

**New Features:**
- 🎨 **Interactive Theme Editor**
  - Create custom themes from templates
  - Edit theme colors with live preview
  - Duplicate themes for variations
  - Delete custom themes
  - Browse all themes with previews
  - Color picker interface

- 🌈 **Enhanced Color Tools**
  - ANSI color code reference
  - Online resource links
  - Color conversion guides
  - Quick reference tables

- 📊 **Better CLI**
  - `--edit` / `--customize` flags
  - Improved help documentation
  - Better error messages
  - Platform detection display

- 📋 **Comprehensive NPM Scripts**
  - 50+ convenient npm scripts
  - Theme-specific scripts
  - Style-specific scripts
  - Preset combo scripts
  - Development watch mode
  - Complete testing setup

- 🏗️ **Refactored Architecture**
  - Split `cli.js` and `installer.js`
  - Better separation of concerns
  - Cleaner module organization
  - Improved code maintainability

**Improvements:**
- 🖥️ **Windows Support**
  - Proper `USERNAME` env var handling
  - Better APPDATA directory management
  - Improved path display

- 📁 **Config Management**
  - Better error handling
  - Automatic directory creation
  - Improved validation
  - More robust file handling

- 🧪 **Testing**
  - 60+ unit and integration tests
  - Cross-platform test coverage
  - Coverage reporting

**Documentation:**
- 📖 Complete theme editor guide
- 🎨 ANSI color code reference
- 🔗 Online color tool resources
- 💡 Color conversion methods
- 📋 NPM scripts documentation
- 📁 Project structure documentation
- 🧪 Testing guide
- 🔧 Comprehensive troubleshooting

**Bug Fixes:**
- Fixed environment variable precedence
- Improved Node.js version compatibility
- Better handling of special characters
- Fixed argument parsing issues

### Version 1.0.0 - Initial Release

**Features:**
- ✨ Realistic Ubuntu apt-get simulation
- 🎨 7 pre-built color themes
- 💻 6 terminal prompt styles
- 💾 Persistent cross-platform configuration
- 🖥️ Full Windows, macOS, Linux support
- 📊 Animated progress bars
- 🎯 Interactive CLI with theme selection
- 🔧 Environment variable overrides

---

## 📄 License

MIT License - Feel free to use, modify, and distribute!

**Copyright (c) 2026 Install Nothing Contributors**

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤔 FAQ

### Q: Is this real?
**A:** No, it's a fun fake installer! Press Ctrl+C anytime to stop. It won't actually install anything.

### Q: Will it install anything?
**A:** No, it's completely harmless. It just shows animated fake output that simulates an Ubuntu package manager installation.

### Q: Can I customize the output?
**A:** Yes! Use `npm run run:edit` to customize themes/colors, or `npm run run:interactive` to change styles. You can create unlimited custom themes.

### Q: Does it work offline?
**A:** Yes! Once installed, it works completely offline. No internet required.

### Q: Can I share my custom themes?
**A:** Yes! Share your config file (`~/.config/install-nothing/config.json` on Linux, etc.) with others, or manually share the theme JSON.

### Q: Does it work on mobile/iPad?
**A:** No, it requires Node.js which isn't available on mobile devices.

### Q: Can I use it in a script?
**A:** Yes, use environment variables:
```bash
THEME=matrix STYLE=classic npm start
```

### Q: How do I uninstall it?
**A:** 
```bash
npm uninstall -g install-nothing
```

### Q: What Node.js versions are supported?
**A:** Node.js 12.0.0 and above. Tested on 12.x, 14.x, 16.x, 18.x.

### Q: Is this developed by GitHub?
**A:** No, it's an independent open-source project developed using GitHub Copilot.

---

## 🆘 Support

Having issues or questions?

### Quick Troubleshooting

1. **View help:**
   ```bash
   npm run help
   install-nothing --help
   ```

2. **Check config:**
   ```bash
   npm run run:config
   ```

3. **Reset to defaults:**
   ```bash
   npm run run:reset
   ```

4. **Try theme editor:**
   ```bash
   npm run run:edit
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

### Get Help

- 📖 Read this comprehensive README
- 🐛 Open an issue on GitHub
- 🔍 Search existing issues

### Report a Bug

Open an issue with:
1. Clear title
2. Description of the problem
3. Steps to reproduce
4. Expected vs actual behavior
5. Your environment (OS, Node.js version)
6. Screenshots if applicable

---

## 🎉 Credits

**Made with ❤️ for developers who need to look busy**

**Inspired by:**
- Matrix movie hacker aesthetic
- Terminal pranks everywhere
- DevOps culture
- Coffee-fueled coding sessions
- The open-source community

**Special Thanks:**
- The Node.js community
- npm ecosystem
- Terminal enthusiasts everywhere
- GitHub Copilot for AI-assisted development

**Development Tools:**
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Jest](https://jestjs.io/)
- [Prompts](https://www.npmjs.com/package/prompts)
- [Nodemon](https://nodemon.io/)
- [GitHub Copilot](https://github.com/features/copilot)

---

**Enjoy your fake installation experience!** 🎭

Press **Ctrl+C** anytime to stop. Use `npm run help` for all commands.

**Happy faking!** ✨

---

**Star this project if you find it useful!** ⭐