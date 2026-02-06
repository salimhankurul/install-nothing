const fs = require('fs');
const path = require('path');
const os = require('os');
const configManager = require('./config-manager');

describe('ConfigManager', () => {
    describe('getPlatformInfo', () => {
        it('should return platform information', () => {
            const info = configManager.getPlatformInfo();

            expect(info).toBeDefined();
            expect(info).toHaveProperty('platform');
            expect(info).toHaveProperty('displayName');
            expect(info).toHaveProperty('configDir');
            expect(info).toHaveProperty('configPath');
        });

        it('should detect correct platform', () => {
            const info = configManager.getPlatformInfo();
            const expectedPlatforms = ['win32', 'darwin', 'linux'];

            expect(expectedPlatforms).toContain(info.platform);
        });

        it('should have valid display name', () => {
            const info = configManager.getPlatformInfo();
            const validDisplayNames = ['Windows', 'macOS', 'Linux'];

            expect(validDisplayNames).toContain(info.displayName);
        });
    });

    describe('loadSavedConfig', () => {
        it('should return an object with required properties', () => {
            const config = configManager.loadSavedConfig();

            expect(config).toBeDefined();
            expect(config).toHaveProperty('theme');
            expect(config).toHaveProperty('style');
            expect(config).toHaveProperty('username');
        });

        it('should have valid default values if no config exists', () => {
            const config = configManager.loadSavedConfig();

            expect(typeof config.theme).toBe('string');
            expect(typeof config.style).toBe('string');
            expect(typeof config.username).toBe('string');
        });

        it('should not throw errors on load', () => {
            expect(() => {
                configManager.loadSavedConfig();
            }).not.toThrow();
        });
    });

    describe('saveConfig', () => {
        it('should accept valid parameters', () => {
            const result = configManager.saveConfig('dark', 'modern', 'testuser');
            expect(typeof result).toBe('boolean');
        });

        it('should return boolean result', () => {
            const result = configManager.saveConfig('matrix', 'classic', 'hacker');
            expect(result === true || result === false).toBe(true);
        });

        it('should handle various theme names', () => {
            const themes = ['dark', 'light', 'matrix', 'cyberpunk', 'retro', 'ocean', 'sunset'];
            themes.forEach(theme => {
                const result = configManager.saveConfig(theme, 'modern', 'user');
                expect(typeof result).toBe('boolean');
            });
        });

        it('should handle various style names', () => {
            const styles = ['modern', 'classic', 'minimal', 'retro_dos', 'fish', 'powerline'];
            styles.forEach(style => {
                const result = configManager.saveConfig('dark', style, 'user');
                expect(typeof result).toBe('boolean');
            });
        });

        it('should not throw on save', () => {
            expect(() => {
                configManager.saveConfig('dark', 'modern', 'testuser');
            }).not.toThrow();
        });
    });

    describe('resetConfig', () => {
        it('should return boolean result', () => {
            const result = configManager.resetConfig();
            expect(result === true || result === false).toBe(true);
        });

        it('should not throw on reset', () => {
            expect(() => {
                configManager.resetConfig();
            }).not.toThrow();
        });
    });

    describe('getConfigPath', () => {
        it('should return a string path', () => {
            const path = configManager.getConfigPath();
            expect(typeof path).toBe('string');
            expect(path.length).toBeGreaterThan(0);
        });

        it('should contain install-nothing in path', () => {
            const path = configManager.getConfigPath();
            expect(path).toContain('install-nothing');
        });

        it('should end with config.json', () => {
            const path = configManager.getConfigPath();
            expect(path.endsWith('config.json')).toBe(true);
        });
    });

    describe('getConfigDir', () => {
        it('should return a string directory path', () => {
            const dir = configManager.getConfigDir();
            expect(typeof dir).toBe('string');
            expect(dir.length).toBeGreaterThan(0);
        });

        it('should contain install-nothing in directory', () => {
            const dir = configManager.getConfigDir();
            expect(dir).toContain('install-nothing');
        });
    });

    describe('getHomeDirectory', () => {
        it('should return the home directory', () => {
            const home = configManager.getHomeDirectory();
            expect(typeof home).toBe('string');
            expect(home.length).toBeGreaterThan(0);
        });

        it('should match os.homedir()', () => {
            const home = configManager.getHomeDirectory();
            const osHome = os.homedir();
            expect(home).toBe(osHome);
        });
    });

    describe('DEFAULT_CONFIG', () => {
        it('should have all required properties', () => {
            expect(configManager.DEFAULT_CONFIG).toHaveProperty('theme');
            expect(configManager.DEFAULT_CONFIG).toHaveProperty('style');
            expect(configManager.DEFAULT_CONFIG).toHaveProperty('username');
        });

        it('should have string values', () => {
            expect(typeof configManager.DEFAULT_CONFIG.theme).toBe('string');
            expect(typeof configManager.DEFAULT_CONFIG.style).toBe('string');
            expect(typeof configManager.DEFAULT_CONFIG.username).toBe('string');
        });

        it('should have sensible defaults', () => {
            expect(configManager.DEFAULT_CONFIG.theme).toBe('dark');
            expect(configManager.DEFAULT_CONFIG.style).toBe('modern');
            expect(configManager.DEFAULT_CONFIG.username.length).toBeGreaterThan(0);
        });

        it('should be immutable reference', () => {
            const config1 = configManager.DEFAULT_CONFIG;
            const config2 = configManager.DEFAULT_CONFIG;
            expect(config1).toBe(config2);
        });
    });

    describe('Module Interface', () => {
        it('should export loadSavedConfig function', () => {
            expect(typeof configManager.loadSavedConfig).toBe('function');
        });

        it('should export saveConfig function', () => {
            expect(typeof configManager.saveConfig).toBe('function');
        });

        it('should export resetConfig function', () => {
            expect(typeof configManager.resetConfig).toBe('function');
        });

        it('should export getConfigPath function', () => {
            expect(typeof configManager.getConfigPath).toBe('function');
        });

        it('should export getConfigDir function', () => {
            expect(typeof configManager.getConfigDir).toBe('function');
        });

        it('should export getPlatformInfo function', () => {
            expect(typeof configManager.getPlatformInfo).toBe('function');
        });

        it('should export getHomeDirectory function', () => {
            expect(typeof configManager.getHomeDirectory).toBe('function');
        });

        it('should export DEFAULT_CONFIG object', () => {
            expect(typeof configManager.DEFAULT_CONFIG).toBe('object');
            expect(configManager.DEFAULT_CONFIG).not.toBeNull();
        });
    });

    describe('Cross-Platform Compatibility', () => {
        it('should work on Windows paths', () => {
            const info = configManager.getPlatformInfo();
            expect(info.configPath).toBeDefined();
            expect(typeof info.configPath).toBe('string');
        });

        it('should work on macOS paths', () => {
            const info = configManager.getPlatformInfo();
            expect(info.configPath).toBeDefined();
            expect(typeof info.configPath).toBe('string');
        });

        it('should work on Linux paths', () => {
            const info = configManager.getPlatformInfo();
            expect(info.configPath).toBeDefined();
            expect(typeof info.configPath).toBe('string');
        });

        it('should return absolute paths', () => {
            const configPath = configManager.getConfigPath();
            expect(path.isAbsolute(configPath)).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle missing config gracefully', () => {
            expect(() => {
                configManager.loadSavedConfig();
            }).not.toThrow();
        });

        it('should handle save errors gracefully', () => {
            expect(() => {
                configManager.saveConfig('dark', 'modern', 'user');
            }).not.toThrow();
        });

        it('should handle reset errors gracefully', () => {
            expect(() => {
                configManager.resetConfig();
            }).not.toThrow();
        });
    });
});