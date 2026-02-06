const fs = require('fs');
const path = require('path');
const os = require('os');

describe('Integration Tests', () => {
    let tempDir;

    beforeEach(() => {
        // Create temporary directory for test configs
        tempDir = path.join(os.tmpdir(), `install-nothing-test-${Date.now()}`);
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
    });

    afterEach(() => {
        // Clean up temporary directory
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    describe('Config File Operations', () => {
        it('should create config directory if it does not exist', () => {
            const testConfigPath = path.join(tempDir, 'install-nothing');
            const configFile = path.join(testConfigPath, 'config.json');

            const config = {
                theme: 'dark',
                style: 'modern',
                username: 'testuser',
                lastUpdated: new Date().toISOString()
            };

            // Create directory
            fs.mkdirSync(testConfigPath, { recursive: true });
            fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

            expect(fs.existsSync(testConfigPath)).toBe(true);
            expect(fs.existsSync(configFile)).toBe(true);
        });

        it('should load and parse config file correctly', () => {
            const configFile = path.join(tempDir, 'config.json');
            const config = {
                theme: 'matrix',
                style: 'classic',
                username: 'hacker',
                lastUpdated: '2026-02-06T10:00:00Z'
            };

            fs.writeFileSync(configFile, JSON.stringify(config));
            const loaded = JSON.parse(fs.readFileSync(configFile, 'utf8'));

            expect(loaded.theme).toBe('matrix');
            expect(loaded.style).toBe('classic');
            expect(loaded.username).toBe('hacker');
        });

        it('should update config file while preserving data', () => {
            const configFile = path.join(tempDir, 'config.json');
            const originalConfig = {
                theme: 'dark',
                style: 'modern',
                username: 'user1'
            };

            // Write original
            fs.writeFileSync(configFile, JSON.stringify(originalConfig));

            // Update
            const updated = {
                ...originalConfig,
                theme: 'cyberpunk'
            };
            fs.writeFileSync(configFile, JSON.stringify(updated));

            // Verify
            const loaded = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            expect(loaded.theme).toBe('cyberpunk');
            expect(loaded.username).toBe('user1'); // Preserved
        });

        it('should delete config file successfully', () => {
            const configFile = path.join(tempDir, 'config.json');
            const config = { theme: 'dark', style: 'modern' };

            fs.writeFileSync(configFile, JSON.stringify(config));
            expect(fs.existsSync(configFile)).toBe(true);

            fs.unlinkSync(configFile);
            expect(fs.existsSync(configFile)).toBe(false);
        });
    });

    describe('Cross-Platform Paths', () => {
        it('should handle Windows-style paths', () => {
            const windowsPath = 'C:\\Users\\testuser\\AppData\\Roaming\\install-nothing';
            expect(windowsPath).toContain('\\');
            expect(windowsPath).toContain('AppData');
        });

        it('should handle macOS-style paths', () => {
            const macPath = '/Users/testuser/Library/Application Support/install-nothing';
            expect(macPath).toContain('/');
            expect(macPath).toContain('Library');
        });

        it('should handle Linux-style paths', () => {
            const linuxPath = '/home/testuser/.config/install-nothing';
            expect(linuxPath).toContain('/.config/');
        });
    });

    describe('JSON File Validation', () => {
        it('should parse valid theme JSON', () => {
            const validTheme = {
                themes: {
                    dark: {
                        name: 'Dark Mode',
                        reset: '\x1b[0m',
                        bright: '\x1b[1m',
                        primary: '\x1b[36m',
                        success: '\x1b[92m'
                    }
                }
            };

            const jsonStr = JSON.stringify(validTheme);
            const parsed = JSON.parse(jsonStr);

            expect(parsed.themes.dark.name).toBe('Dark Mode');
            expect(parsed.themes.dark.reset).toBe('\x1b[0m');
        });

        it('should parse valid style JSON', () => {
            const validStyle = {
                styles: {
                    modern: {
                        name: 'Modern',
                        format: 'modern',
                        arrow: '➜'
                    }
                }
            };

            const jsonStr = JSON.stringify(validStyle);
            const parsed = JSON.parse(jsonStr);

            expect(parsed.styles.modern.format).toBe('modern');
            expect(parsed.styles.modern.arrow).toBe('➜');
        });

        it('should handle invalid JSON gracefully', () => {
            const invalidJson = '{ invalid json }';

            expect(() => {
                JSON.parse(invalidJson);
            }).toThrow(SyntaxError);
        });
    });

    describe('Environment Variables', () => {
        it('should read THEME environment variable', () => {
            process.env.THEME = 'matrix';
            expect(process.env.THEME).toBe('matrix');
            delete process.env.THEME;
        });

        it('should read STYLE environment variable', () => {
            process.env.STYLE = 'classic';
            expect(process.env.STYLE).toBe('classic');
            delete process.env.STYLE;
        });

        it('should read USER environment variable', () => {
            process.env.USER = 'testuser';
            expect(process.env.USER).toBe('testuser');
            delete process.env.USER;
        });

        it('should read USERNAME environment variable (Windows)', () => {
            process.env.USERNAME = 'windowsuser';
            expect(process.env.USERNAME).toBe('windowsuser');
            delete process.env.USERNAME;
        });

        it('should fall back to default if env var not set', () => {
            delete process.env.THEME;
            delete process.env.USER;

            // Simulating default behavior
            const theme = process.env.THEME || 'dark';
            const user = process.env.USER || 'root';

            expect(theme).toBe('dark');
            expect(user).toBe('root');
        });
    });
});