/**
 * Theme Editor
 * Allows users to create custom themes and modify existing ones
 */

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

// --- Color codes ---
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[92m',
    yellow: '\x1b[93m',
    blue: '\x1b[94m',
    magenta: '\x1b[35m',
    red: '\x1b[91m',
    gray: '\x1b[90m'
};

// --- Load configuration files ---
const loadThemesFile = () => {
    try {
        const themesPath = path.join(__dirname, '..', 'config', 'themes.json');
        return JSON.parse(fs.readFileSync(themesPath, 'utf8'));
    } catch (error) {
        console.error('Error loading themes:', error.message);
        return null;
    }
};

const loadStylesFile = () => {
    try {
        const stylesPath = path.join(__dirname, '..', 'config', 'styles.json');
        return JSON.parse(fs.readFileSync(stylesPath, 'utf8'));
    } catch (error) {
        console.error('Error loading styles:', error.message);
        return null;
    }
};

// --- Save configuration files ---
const saveThemesFile = (data) => {
    try {
        const themesPath = path.join(__dirname, '..', 'config', 'themes.json');
        fs.writeFileSync(themesPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving themes:', error.message);
        return false;
    }
};

const saveStylesFile = (data) => {
    try {
        const stylesPath = path.join(__dirname, '..', 'config', 'styles.json');
        fs.writeFileSync(stylesPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving styles:', error.message);
        return false;
    }
};

// --- Display banner ---
const displayBanner = () => {
    console.clear();
    console.log(`${colors.cyan}${colors.bright}`);
    console.log(`╔════════════════════════════════════════════════════════════╗`);
    console.log(`║                                                            ║`);
    console.log(`║          🎨  INSTALL NOTHING - THEME/STYLE EDITOR 🎨      ║`);
    console.log(`║                                                            ║`);
    console.log(`║         Create and customize themes and terminal styles    ║`);
    console.log(`║                                                            ║`);
    console.log(`╚════════════════════════════════════════════════════════════╝`);
    console.log(`${colors.reset}\n`);
};

// --- Preview ANSI color ---
const previewColor = (ansiCode) => {
    return `${ansiCode}■■■■■${colors.reset}`;
};

// --- Edit existing theme ---
const editExistingTheme = async () => {
    const themesData = loadThemesFile();
    if (!themesData) return;

    const themeNames = Object.keys(themesData.themes);

    const themeResponse = await prompts({
        type: 'select',
        name: 'theme',
        message: `${colors.green}Select a theme to edit:${colors.reset}`,
        choices: themeNames.map(name => ({
            title: `${themesData.themes[name].name}`,
            value: name
        }))
    });

    if (!themeResponse.theme) return;

    const themeName = themeResponse.theme;
    const theme = themesData.themes[themeName];

    console.log(`\n${colors.cyan}${colors.bright}Editing Theme: ${theme.name}${colors.reset}\n`);
    console.log(`${colors.gray}Current color codes:${colors.reset}`);

    const colorFields = [
        'reset', 'bright', 'dim', 'primary', 'success', 'warning',
        'error', 'info', 'secondary', 'text', 'muted', 'progress_fill', 'progress_empty'
    ];

    for (const field of colorFields) {
        if (theme[field]) {
            console.log(`  ${field.padEnd(20)} ${previewColor(theme[field])} ${theme[field]}`);
        }
    }

    console.log(`\n${colors.yellow}Note: Enter ANSI color codes (e.g., "\\x1b[32m" for green)${colors.reset}\n`);

    const editResponse = await prompts({
        type: 'select',
        name: 'field',
        message: `${colors.green}Select a color to edit:${colors.reset}`,
        choices: colorFields.map(field => ({
            title: `${field}`,
            value: field,
            description: theme[field] ? theme[field] : 'Not set'
        }))
    });

    if (!editResponse.field) return;

    const colorResponse = await prompts({
        type: 'text',
        name: 'code',
        message: `${colors.green}Enter ANSI color code for ${editResponse.field}:${colors.reset}`,
        initial: theme[editResponse.field] || ''
    });

    if (colorResponse.code) {
        theme[editResponse.field] = colorResponse.code;

        const saveResponse = await prompts({
            type: 'confirm',
            name: 'value',
            message: `${colors.green}Save changes to ${theme.name}?${colors.reset}`,
            initial: true
        });

        if (saveResponse.value) {
            if (saveThemesFile(themesData)) {
                console.log(`${colors.green}✓ Theme updated successfully!${colors.reset}\n`);
            } else {
                console.log(`${colors.red}✗ Failed to save theme${colors.reset}\n`);
            }
        }
    }
};

// --- Create new theme ---
const createNewTheme = async () => {
    const themesData = loadThemesFile();
    if (!themesData) return;

    console.log(`\n${colors.cyan}${colors.bright}Creating New Theme${colors.reset}\n`);

    const nameResponse = await prompts({
        type: 'text',
        name: 'name',
        message: `${colors.green}Theme name:${colors.reset}`,
        validate: (value) => {
            const key = value.toLowerCase().replace(/\s+/g, '_');
            if (themesData.themes[key]) {
                return `Theme "${key}" already exists`;
            }
            return true;
        }
    });

    if (!nameResponse.name) return;

    const displayNameResponse = await prompts({
        type: 'text',
        name: 'displayName',
        message: `${colors.green}Display name (for menu):${colors.reset}`,
        initial: nameResponse.name
    });

    if (!displayNameResponse.displayName) return;

    const themeKey = nameResponse.name.toLowerCase().replace(/\s+/g, '_');

    // Use an existing theme as a template
    const existingThemes = Object.keys(themesData.themes);

    const templateResponse = await prompts({
        type: 'select',
        name: 'template',
        message: `${colors.green}Use an existing theme as template:${colors.reset}`,
        choices: existingThemes.map(name => ({
            title: themesData.themes[name].name,
            value: name
        })),
        initial: 0
    });

    if (!templateResponse.template) return;

    const newTheme = {
        ...JSON.parse(JSON.stringify(themesData.themes[templateResponse.template])),
        name: displayNameResponse.displayName
    };

    themesData.themes[themeKey] = newTheme;

    console.log(`\n${colors.cyan}${colors.bright}New Theme Preview:${colors.reset}`);
    console.log(`  Key:          ${colors.magenta}${themeKey}${colors.reset}`);
    console.log(`  Display Name: ${colors.magenta}${newTheme.name}${colors.reset}`);
    console.log(`  Primary:      ${previewColor(newTheme.primary)}`);
    console.log(`  Success:      ${previewColor(newTheme.success)}`);
    console.log(`  Error:        ${previewColor(newTheme.error)}\n`);

    const saveResponse = await prompts({
        type: 'confirm',
        name: 'value',
        message: `${colors.green}Create this theme?${colors.reset}`,
        initial: true
    });

    if (saveResponse.value) {
        if (saveThemesFile(themesData)) {
            console.log(`${colors.green}✓ Theme "${themeKey}" created successfully!${colors.reset}`);
            console.log(`${colors.cyan}You can now use it with: THEME=${themeKey} install-nothing\n${colors.reset}`);
        } else {
            console.log(`${colors.red}✗ Failed to save theme${colors.reset}\n`);
        }
    }
};

// --- Duplicate theme ---
const duplicateTheme = async () => {
    const themesData = loadThemesFile();
    if (!themesData) return;

    const themeNames = Object.keys(themesData.themes);

    const sourceResponse = await prompts({
        type: 'select',
        name: 'theme',
        message: `${colors.green}Select a theme to duplicate:${colors.reset}`,
        choices: themeNames.map(name => ({
            title: themesData.themes[name].name,
            value: name
        }))
    });

    if (!sourceResponse.theme) return;

    const nameResponse = await prompts({
        type: 'text',
        name: 'name',
        message: `${colors.green}New theme name (key):${colors.reset}`,
        initial: `${sourceResponse.theme}_copy`,
        validate: (value) => {
            if (themesData.themes[value]) {
                return `Theme "${value}" already exists`;
            }
            return true;
        }
    });

    if (!nameResponse.name) return;

    const displayNameResponse = await prompts({
        type: 'text',
        name: 'displayName',
        message: `${colors.green}Display name:${colors.reset}`,
        initial: `${themesData.themes[sourceResponse.theme].name} (Copy)`
    });

    if (!displayNameResponse.displayName) return;

    const newTheme = JSON.parse(JSON.stringify(themesData.themes[sourceResponse.theme]));
    newTheme.name = displayNameResponse.displayName;

    themesData.themes[nameResponse.name] = newTheme;

    const saveResponse = await prompts({
        type: 'confirm',
        name: 'value',
        message: `${colors.green}Create duplicate theme?${colors.reset}`,
        initial: true
    });

    if (saveResponse.value) {
        if (saveThemesFile(themesData)) {
            console.log(`${colors.green}✓ Theme duplicated as "${nameResponse.name}"${colors.reset}\n`);
        } else {
            console.log(`${colors.red}✗ Failed to save theme${colors.reset}\n`);
        }
    }
};

// --- List all themes ---
const listThemes = async () => {
    const themesData = loadThemesFile();
    if (!themesData) return;

    console.log(`\n${colors.cyan}${colors.bright}Available Themes:${colors.reset}\n`);

    Object.entries(themesData.themes).forEach(([key, theme]) => {
        console.log(`  ${colors.magenta}${key}${colors.reset}`);
        console.log(`    Name:    ${theme.name}`);
        console.log(`    Primary: ${previewColor(theme.primary)}`);
        console.log(`    Success: ${previewColor(theme.success)}`);
        console.log(`    Error:   ${previewColor(theme.error)}\n`);
    });
};

// --- Delete theme ---
const deleteTheme = async () => {
    const themesData = loadThemesFile();
    if (!themesData) return;

    const systemThemes = ['dark', 'light', 'matrix', 'cyberpunk', 'retro', 'ocean', 'sunset'];
    const customThemes = Object.keys(themesData.themes).filter(t => !systemThemes.includes(t));

    if (customThemes.length === 0) {
        console.log(`${colors.yellow}No custom themes to delete. System themes cannot be deleted.${colors.reset}\n`);
        return;
    }

    const themeResponse = await prompts({
        type: 'select',
        name: 'theme',
        message: `${colors.green}Select a custom theme to delete:${colors.reset}`,
        choices: customThemes.map(name => ({
            title: themesData.themes[name].name,
            value: name
        }))
    });

    if (!themeResponse.theme) return;

    const confirmResponse = await prompts({
        type: 'confirm',
        name: 'value',
        message: `${colors.red}Are you sure you want to delete "${themesData.themes[themeResponse.theme].name}"?${colors.reset}`,
        initial: false
    });

    if (confirmResponse.value) {
        delete themesData.themes[themeResponse.theme];

        if (saveThemesFile(themesData)) {
            console.log(`${colors.green}✓ Theme deleted successfully${colors.reset}\n`);
        } else {
            console.log(`${colors.red}✗ Failed to delete theme${colors.reset}\n`);
        }
    }
};

// --- Main editor menu ---
async function runThemeEditor() {
    displayBanner();

    while (true) {
        const mainResponse = await prompts({
            type: 'select',
            name: 'action',
            message: `${colors.green}What would you like to do?${colors.reset}`,
            choices: [
                { title: 'List all themes', value: 'list' },
                { title: 'Create new theme', value: 'create' },
                { title: 'Edit existing theme', value: 'edit' },
                { title: 'Duplicate theme', value: 'duplicate' },
                { title: 'Delete custom theme', value: 'delete' },
                { title: 'Exit editor', value: 'exit' }
            ]
        });

        switch (mainResponse.action) {
            case 'list':
                await listThemes();
                break;
            case 'create':
                await createNewTheme();
                break;
            case 'edit':
                await editExistingTheme();
                break;
            case 'duplicate':
                await duplicateTheme();
                break;
            case 'delete':
                await deleteTheme();
                break;
            case 'exit':
                console.log(`\n${colors.cyan}Exiting theme editor...${colors.reset}\n`);
                process.exit(0);
            default:
                break;
        }
    }
}

module.exports = {
    runThemeEditor,
    loadThemesFile,
    loadStylesFile,
    saveThemesFile,
    saveStylesFile
};