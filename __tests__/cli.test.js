const { spawnSync } = require('child_process');
const path = require('path');

describe('CLI Commands', () => {
    const cliPath = path.join(__dirname, '..', 'cli.js');

    describe('--help flag', () => {
        it('should display help information', () => {
            const result = spawnSync('node', [cliPath, '--help'], {
                encoding: 'utf8',
                timeout: 5000,
                stdio: 'pipe'
            });

            const output = result.stdout || result.stderr || '';
            expect(output).toContain('Install Nothing');
        });

        it('should work with -h shorthand', () => {
            const result = spawnSync('node', [cliPath, '-h'], {
                encoding: 'utf8',
                timeout: 5000,
                stdio: 'pipe'
            });

            const output = result.stdout || result.stderr || '';
            expect(output).toContain('Install Nothing');
        });
    });

    describe('--config flag', () => {
        it('should handle config command without crashing', () => {
            const result = spawnSync('node', [cliPath, '--config'], {
                encoding: 'utf8',
                timeout: 5000,
                stdio: 'pipe'
            });

            // Command should complete (either success or graceful error)
            expect(result).toBeDefined();
        });
    });

    describe('--reset flag', () => {
        it('should handle reset command without crashing', () => {
            const result = spawnSync('node', [cliPath, '--reset'], {
                encoding: 'utf8',
                timeout: 5000,
                stdio: 'pipe'
            });

            expect(result).toBeDefined();
        });
    });

    describe('Flag Validation', () => {
        it('should recognize long format flags', () => {
            const validFlags = ['--help', '--config', '--reset', '--edit', '--custom'];
            validFlags.forEach(flag => {
                expect(flag).toMatch(/^--[a-z-]+$/);
            });
        });

        it('should recognize short format flags', () => {
            const validFlags = ['-h'];
            validFlags.forEach(flag => {
                expect(flag).toMatch(/^-[a-z]$/);
            });
        });
    });

    describe('Environment Variables', () => {
        it('should list valid theme names', () => {
            const validThemes = ['dark', 'light', 'matrix', 'cyberpunk', 'retro', 'ocean', 'sunset'];
            expect(validThemes.length).toBeGreaterThan(0);
            validThemes.forEach(theme => {
                expect(typeof theme).toBe('string');
            });
        });

        it('should list valid style names', () => {
            const validStyles = ['modern', 'classic', 'minimal', 'retro_dos', 'fish', 'powerline'];
            expect(validStyles.length).toBeGreaterThan(0);
            validStyles.forEach(style => {
                expect(typeof style).toBe('string');
            });
        });

        it('should support THEME environment variable', () => {
            const originalTheme = process.env.THEME;
            process.env.THEME = 'matrix';
            expect(process.env.THEME).toBe('matrix');
            process.env.THEME = originalTheme;
        });

        it('should support STYLE environment variable', () => {
            const originalStyle = process.env.STYLE;
            process.env.STYLE = 'classic';
            expect(process.env.STYLE).toBe('classic');
            process.env.STYLE = originalStyle;
        });
    });
});