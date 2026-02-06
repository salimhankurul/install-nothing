/**
 * Config Manager
 * Handles saving and loading user preferences across Windows, macOS, and Linux
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Get platform-specific config directory ---
const getConfigDir = () => {
    const platform = process.platform;
    let configDir;

    switch (platform) {
        case 'win32': {
            // Windows: %APPDATA%\install-nothing
            const appDataDir = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
            configDir = path.join(appDataDir, 'install-nothing');
            break;
        }
        case 'darwin': {
            // macOS: ~/Library/Application Support/install-nothing
            configDir = path.join(os.homedir(), 'Library', 'Application Support', 'install-nothing');
            break;
        }
        case 'linux':
        default: {
            // Linux: ~/.config/install-nothing (XDG Base Directory spec)
            const xdgConfigHome = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
            configDir = path.join(xdgConfigHome, 'install-nothing');
            break;
        }
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(configDir)) {
        try {
            fs.mkdirSync(configDir, { recursive: true });
        } catch (error) {
            console.error(`Error creating config directory at ${configDir}:`, error.message);
        }
    }

    return configDir;
};

const getConfigPath = () => {
    return path.join(getConfigDir(), 'config.json');
};

// --- Default config ---
const DEFAULT_CONFIG = {
    theme: 'dark',
    style: 'modern',
    username: process.env.USER || process.env.USERNAME || 'root'
};

// --- Get platform info ---
const getPlatformInfo = () => {
    const platform = process.platform;
    const platformNames = {
        'win32': 'Windows',
        'darwin': 'macOS',
        'linux': 'Linux'
    };

    return {
        platform,
        displayName: platformNames[platform] || platform,
        configDir: getConfigDir(),
        configPath: getConfigPath()
    };
};

// --- Load saved config ---
const loadSavedConfig = () => {
    try {
        const configPath = getConfigPath();
        if (fs.existsSync(configPath)) {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            return { ...DEFAULT_CONFIG, ...data };
        }
    } catch (error) {
        console.error('Error loading saved config:', error.message);
    }
    return DEFAULT_CONFIG;
};

// --- Save config ---
const saveConfig = (theme, style, username) => {
    try {
        const configPath = getConfigPath();
        const configDir = getConfigDir();

        // Ensure directory exists
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        const config = {
            theme,
            style,
            username,
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving config:', error.message);
        return false;
    }
};

// --- Reset config to defaults ---
const resetConfig = () => {
    try {
        const configPath = getConfigPath();
        if (fs.existsSync(configPath)) {
            fs.unlinkSync(configPath);
        }
        return true;
    } catch (error) {
        console.error('Error resetting config:', error.message);
        return false;
    }
};

// --- Get user's home directory (cross-platform) ---
const getHomeDirectory = () => {
    return os.homedir();
};

// --- Format path for display (handles Windows backslashes) ---
const formatPathForDisplay = (filePath) => {
    // On Windows, show with backslashes; on Unix, show with forward slashes
    if (process.platform === 'win32') {
        return filePath;
    }
    return filePath;
};

module.exports = {
    loadSavedConfig,
    saveConfig,
    resetConfig,
    getConfigPath,
    getConfigDir,
    getPlatformInfo,
    getHomeDirectory,
    formatPathForDisplay,
    DEFAULT_CONFIG
};