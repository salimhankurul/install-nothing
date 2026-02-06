#!/usr/bin/env node

/**
 * CLI Interface for Install Nothing
 * Allows users to select themes and styles interactively
 * Cross-platform support: Windows, macOS, Linux
 */

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const configManager = require('./lib/config-manager');

// --- Load Configuration from JSON ---
const loadConfig = () => {
    try {
        const themesPath = path.join(__dirname, 'config', 'themes.json');
        const stylesPath = path.join(__dirname, 'config', 'styles.json');

        if (!fs.existsSync(themesPath) || !fs.existsSync(stylesPath)) {
            throw new Error('Config files not found');
        }

        const themesData = JSON.parse(fs.readFileSync(themesPath, 'utf8'));
        const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

        return {
            themes: themesData.themes,
            styles: stylesData.styles
        };
    } catch (error) {
        console.error('Error loading configuration:', error.message);
        process.exit(1);
    }
};

const CONFIG_FILES = loadConfig();
const THEMES = CONFIG_FILES.themes;
const STYLES = CONFIG_FILES.styles;

// --- Simple color codes for CLI menu ---
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[92m',
    yellow: '\x1b[93m',
    blue: '\x1b[94m',
    magenta: '\x1b[35m',
    red: '\x1b[91m'
};

// --- Display Welcome Banner ---
const displayBanner = () => {
    console.clear();
    console.log(`${colors.cyan}${colors.bright}`);
    console.log(`╔════════════════════════════════════════════════════════════╗`);
    console.log(`║                                                            ║`);
    console.log(`║           🎭  INSTALL NOTHING - INTERACTIVE CLI 🎭         ║`);
    console.log(`║                                                            ║`);
    console.log(`║    An endless fake installer with customizable themes      ║`);
    console.log(`║                                                            ║`);
    console.log(`╚════════════════════════════════════════════════════════════╝`);
    console.log(`${colors.reset}\n`);
};

// --- Display current config ---
const displayCurrentConfig = (config) => {
    console.log(`${colors.blue}${colors.bright}Current Configuration:${colors.reset}`);
    console.log(`  Theme:    ${colors.magenta}${THEMES[config.theme]?.name || config.theme}${colors.reset}`);
    console.log(`  Style:    ${colors.magenta}${STYLES[config.style]?.name || config.style}${colors.reset}`);
    console.log(`  Username: ${colors.magenta}${config.username}${colors.reset}\n`);
};

// --- Main CLI Function ---
async function runCLI(forceCustom = false) {
    displayBanner();

    const platformInfo = configManager.getPlatformInfo();
    const savedConfig = configManager.loadSavedConfig();

    try {
        let theme = savedConfig.theme;
        let style = savedConfig.style;
        let username = savedConfig.username;

        // If not forcing custom mode and we have saved config, show option to use it
        if (!forceCustom && savedConfig.theme && savedConfig.style) {
            displayCurrentConfig(savedConfig);

            const useExisting = await prompts({
                type: 'confirm',
                name: 'value',
                message: `${colors.green}Use saved configuration?${colors.reset}`,
                initial: true
            });

            if (useExisting.value) {
                // Use saved config - launch installer with env vars
                console.log(`\n${colors.yellow}Press Ctrl+C to stop the installer${colors.reset}\n`);
                process.env.THEME = theme;
                process.env.STYLE = style;
                process.env.USER = username;

                // Import and run the installer
                const installer = require('./installer');
                installer.run();
                return;
            }
        }

        // Theme Selection
        const themeChoices = Object.entries(THEMES).map(([key, theme]) => ({
            title: `${theme.name}`,
            value: key,
            description: `Theme: ${key}`
        }));

        const themeIndex = Object.keys(THEMES).indexOf(savedConfig.theme);
        const themeResponse = await prompts({
            type: 'select',
            name: 'theme',
            message: `${colors.green}Select a Theme:${colors.reset}`,
            choices: themeChoices,
            initial: themeIndex >= 0 ? themeIndex : 0
        });

        if (!themeResponse.theme) {
            console.log(`${colors.yellow}Cancelled${colors.reset}`);
            process.exit(0);
        }

        theme = themeResponse.theme;

        // Style Selection
        const styleChoices = Object.entries(STYLES).map(([key, style]) => ({
            title: `${style.name}`,
            value: key,
            description: `Style: ${key}`
        }));

        const styleIndex = Object.keys(STYLES).indexOf(savedConfig.style);
        const styleResponse = await prompts({
            type: 'select',
            name: 'style',
            message: `${colors.green}Select a Terminal Style:${colors.reset}`,
            choices: styleChoices,
            initial: styleIndex >= 0 ? styleIndex : 0
        });

        if (!styleResponse.style) {
            console.log(`${colors.yellow}Cancelled${colors.reset}`);
            process.exit(0);
        }

        style = styleResponse.style;

        // Username (optional)
        const usernameResponse = await prompts({
            type: 'text',
            name: 'username',
            message: `${colors.green}Username (press Enter to use system username):${colors.reset}`,
            initial: savedConfig.username || process.env.USER || process.env.USERNAME || 'root'
        });

        username = usernameResponse.username || process.env.USER || process.env.USERNAME || 'root';

        // Confirmation and Save
        console.log(`\n${colors.cyan}${colors.bright}Summary:${colors.reset}`);
        console.log(`  Theme:    ${colors.magenta}${THEMES[theme].name}${colors.reset}`);
        console.log(`  Style:    ${colors.magenta}${STYLES[style].name}${colors.reset}`);
        console.log(`  Username: ${colors.magenta}${username}${colors.reset}`);

        const saveResponse = await prompts({
            type: 'confirm',
            name: 'value',
            message: `${colors.green}Save as default configuration?${colors.reset}`,
            initial: true
        });

        if (saveResponse.value) {
            const saved = configManager.saveConfig(theme, style, username);
            if (saved) {
                console.log(`${colors.green}✓ Configuration saved${colors.reset}`);
                console.log(`  Platform: ${colors.magenta}${platformInfo.displayName}${colors.reset}`);
                console.log(`  Saved to: ${colors.magenta}${configManager.getConfigPath()}${colors.reset}\n`);
            } else {
                console.log(`${colors.red}✗ Failed to save configuration${colors.reset}\n`);
            }
        }

        console.log(`${colors.yellow}Press Ctrl+C to stop the installer${colors.reset}\n`);

        // Set environment variables and run installer
        process.env.THEME = theme;
        process.env.STYLE = style;
        process.env.USER = username;

        // Import and run the installer
        const installer = require('./installer');
        installer.run();

    } catch (error) {
        console.error(`${colors.red}Error:${colors.reset}`, error.message);
        process.exit(1);
    }
}

// Handle cancel/interrupt
process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}Cancelled${colors.reset}`);
    process.exit(0);
});

// --- COMMAND LINE ARGUMENT HANDLING ---
const args = process.argv.slice(2);

// Help flag - MUST be first
if (args.includes('--help') || args.includes('-h')) {
    const platformInfo = configManager.getPlatformInfo();
    console.log(`\n${colors.bright}Install Nothing - Interactive CLI${colors.reset}`);
    console.log(`${colors.cyan}Version 1.1.0 | Platform: ${platformInfo.displayName}${colors.reset}\n`);
    console.log(`${colors.green}Usage:${colors.reset}`);
    console.log(`  install-nothing              # Run with last saved config`);
    console.log(`  install-nothing --custom     # Choose theme/style interactively`);
    console.log(`  install-nothing --edit       # Edit and create themes`);
    console.log(`  install-nothing --config     # Show saved config`);
    console.log(`  install-nothing --reset      # Reset to default config`);
    console.log(`  install-nothing --help       # Show this help\n`);
    console.log(`${colors.green}Examples:${colors.reset}`);
    console.log(`  install-nothing                        # Use saved theme`);
    console.log(`  install-nothing --edit                 # Customize themes`);
    console.log(`  THEME=matrix install-nothing           # Override with env var`);
    console.log(`  install-nothing --custom               # Interactive selection`);
    console.log(`  install-nothing --reset                # Reset saved config\n`);
    console.log(`${colors.green}Configuration Location:${colors.reset}`);
    console.log(`  ${platformInfo.configPath}\n`);
    process.exit(0);
}

// Config flag
if (args.includes('--config')) {
    const savedConfig = configManager.loadSavedConfig();
    const platformInfo = configManager.getPlatformInfo();
    console.log(`\n${colors.bright}Saved Configuration:${colors.reset}\n`);
    console.log(`  Platform: ${colors.magenta}${platformInfo.displayName}${colors.reset}`);
    console.log(`  Location: ${colors.magenta}${platformInfo.configPath}${colors.reset}`);
    console.log(`  Theme:    ${colors.magenta}${THEMES[savedConfig.theme]?.name || savedConfig.theme}${colors.reset}`);
    console.log(`  Style:    ${colors.magenta}${STYLES[savedConfig.style]?.name || savedConfig.style}${colors.reset}`);
    console.log(`  Username: ${colors.magenta}${savedConfig.username}${colors.reset}`);
    if (savedConfig.lastUpdated) {
        console.log(`  Updated:  ${colors.magenta}${savedConfig.lastUpdated}${colors.reset}`);
    }
    console.log('');
    process.exit(0);
}

// Reset flag
if (args.includes('--reset')) {
    const platformInfo = configManager.getPlatformInfo();
    const reset = configManager.resetConfig();
    if (reset) {
        console.log(`\n${colors.green}✓ Configuration reset to defaults${colors.reset}`);
        console.log(`  Removed: ${colors.magenta}${platformInfo.configPath}${colors.reset}\n`);
    } else {
        console.log(`\n${colors.red}✗ Failed to reset configuration${colors.reset}\n`);
    }
    process.exit(0);
}

// Edit/Customize flags
if (args.includes('--edit') || args.includes('--customize')) {
    try {
        const themeEditor = require('./lib/theme-editor');
        themeEditor.runThemeEditor();
    } catch (error) {
        console.error(`${colors.red}Error loading theme editor:${colors.reset}`, error.message);
        process.exit(1);
    }
}

// Default behavior: Run interactive CLI
const forceCustom = args.includes('--custom');
runCLI(forceCustom);