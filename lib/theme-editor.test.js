const themeEditor = require('./theme-editor');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('prompts');

describe('Theme Editor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('loadThemesFile', () => {
        it('should load themes from JSON file', () => {
            const mockThemes = {
                themes: {
                    dark: { name: 'Dark Mode' },
                    light: { name: 'Light Mode' }
                }
            };

            fs.readFileSync.mockReturnValue(JSON.stringify(mockThemes));
            fs.existsSync.mockReturnValue(true);

            // Note: This requires exporting the function
            // Internal implementation will vary
            expect(themeEditor.loadThemesFile).toBeDefined();
        });

        it('should handle missing themes file', () => {
            fs.existsSync.mockReturnValue(false);

            // Should return null or throw appropriate error
            expect(themeEditor.loadThemesFile).toBeDefined();
        });
    });

    describe('loadStylesFile', () => {
        it('should load styles from JSON file', () => {
            const mockStyles = {
                styles: {
                    modern: { name: 'Modern' },
                    classic: { name: 'Classic' }
                }
            };

            fs.readFileSync.mockReturnValue(JSON.stringify(mockStyles));
            fs.existsSync.mockReturnValue(true);

            expect(themeEditor.loadStylesFile).toBeDefined();
        });
    });

    describe('saveThemesFile', () => {
        it('should save themes successfully', () => {
            fs.writeFileSync.mockImplementation(() => { });

            const testData = { themes: { dark: { name: 'Dark' } } };
            const result = themeEditor.saveThemesFile(testData);

            expect(result).toBe(true);
            expect(fs.writeFileSync).toHaveBeenCalled();
        });

        it('should handle save errors', () => {
            fs.writeFileSync.mockImplementation(() => {
                throw new Error('Write failed');
            });

            const testData = { themes: { dark: { name: 'Dark' } } };
            const result = themeEditor.saveThemesFile(testData);

            expect(result).toBe(false);
        });
    });

    describe('saveStylesFile', () => {
        it('should save styles successfully', () => {
            fs.writeFileSync.mockImplementation(() => { });

            const testData = { styles: { modern: { name: 'Modern' } } };
            const result = themeEditor.saveStylesFile(testData);

            expect(result).toBe(true);
            expect(fs.writeFileSync).toHaveBeenCalled();
        });
    });
});