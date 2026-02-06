/**
 * Test utilities and mock data
 */

// Mock theme data
const mockThemes = {
    themes: {
        dark: {
            name: 'Dark Mode',
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            primary: '\x1b[36m',
            success: '\x1b[92m',
            warning: '\x1b[93m',
            error: '\x1b[91m',
            info: '\x1b[94m',
            secondary: '\x1b[35m',
            text: '\x1b[37m',
            muted: '\x1b[90m',
            progress_fill: '\x1b[36m',
            progress_empty: '\x1b[90m'
        },
        matrix: {
            name: 'Matrix',
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            primary: '\x1b[32m',
            success: '\x1b[92m',
            warning: '\x1b[32m',
            error: '\x1b[91m',
            info: '\x1b[32m',
            secondary: '\x1b[32m',
            text: '\x1b[32m',
            muted: '\x1b[90m',
            progress_fill: '\x1b[32m',
            progress_empty: '\x1b[90m'
        }
    }
};

// Mock styles data
const mockStyles = {
    styles: {
        modern: {
            name: 'Modern (ZSH/Powerline)',
            format: 'modern',
            arrow: '➜',
            separator: ' '
        },
        classic: {
            name: 'Classic (Bash)',
            format: 'classic',
            separator: '@'
        },
        minimal: {
            name: 'Minimal',
            format: 'minimal',
            symbol: '>'
        }
    }
};

// Mock config data
const mockConfig = {
    theme: 'dark',
    style: 'modern',
    username: 'testuser',
    lastUpdated: '2026-02-06T10:00:00Z'
};

module.exports = {
    mockThemes,
    mockStyles,
    mockConfig
};