/**
 * ENDLESS FAKE INSTALLER (Artistic Edition)
 * A "useful" tool to look busy with a beautiful terminal output.
 * Now with multiple color schemes and terminal styles!
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

// --- Load Configuration from JSON ---
const loadConfig = () => {
    try {
        const themesPath = path.join(__dirname, 'config', 'themes.json');
        const stylesPath = path.join(__dirname, 'config', 'styles.json');

        if (!fs.existsSync(themesPath)) {
            console.error(`Error: config/themes.json not found at ${themesPath}`);
            process.exit(1);
        }
        if (!fs.existsSync(stylesPath)) {
            console.error(`Error: config/styles.json not found at ${stylesPath}`);
            process.exit(1);
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

// --- Load themes and styles ---
const CONFIG_FILES = loadConfig();
const THEMES = CONFIG_FILES.themes;
const STYLES = CONFIG_FILES.styles;

// --- Configuration ---
const CONFIG = {
    hostname: 'mainframe-prod-01',
    username: process.env.USER || process.env.USERNAME || 'root',
    speed: 1.0,
    theme: process.env.THEME || 'dark',
    style: process.env.STYLE || 'modern'
};

// --- Validate theme and style ---
if (!THEMES[CONFIG.theme]) {
    console.error(`Error: Theme '${CONFIG.theme}' not found. Available themes: ${Object.keys(THEMES).join(', ')}`);
    process.exit(1);
}
if (!STYLES[CONFIG.style]) {
    console.error(`Error: Style '${CONFIG.style}' not found. Available styles: ${Object.keys(STYLES).join(', ')}`);
    process.exit(1);
}

// --- Get Current Theme & Style ---
const C = THEMES[CONFIG.theme];
const STYLE_CONFIG = STYLES[CONFIG.style];

// --- Build Prompt Based on Style ---
const buildPrompt = () => {
    const styleFormat = STYLE_CONFIG.format;

    switch (styleFormat) {
        case 'modern': {
            const arrow = `${C.success}${STYLE_CONFIG.arrow}${C.reset}`;
            const pathStr = `${C.primary}~${C.reset}`;
            const branch = `${C.dim}git:(${C.error}master${C.dim})${C.reset}`;
            return `${arrow}  ${pathStr} ${branch} ${C.reset}`;
        }
        case 'classic': {
            const user = `${C.success}${CONFIG.username}${C.reset}`;
            const host = `${C.primary}${CONFIG.hostname}${C.reset}`;
            return `${user}${STYLE_CONFIG.separator}${host}:${C.info}~${C.reset}$ `;
        }
        case 'minimal': {
            return `${C.primary}${STYLE_CONFIG.symbol}${C.reset} `;
        }
        case 'retro_dos': {
            return `${C.primary}C:\\SYSTEM${STYLE_CONFIG.symbol}${C.reset} `;
        }
        case 'fish': {
            return `${C.success}${STYLE_CONFIG.symbol}${C.reset} `;
        }
        case 'powerline': {
            const pathSegment = `${C.success}${C.bright}~${C.reset}`;
            return `${pathSegment} ${C.secondary}${STYLE_CONFIG.symbol}${C.reset} `;
        }
        default:
            return `${C.primary}>${C.reset} `;
    }
};

// --- Data Lists ---
const PKG_PREFIXES = [
    "lib", "gnome", "linux", "python3", "node", "docker", "k8s", "vim", "gcc",
    "openssl", "systemd", "x11", "wayland", "mesa", "nvidia", "amd", "intel",
    "cups", "bluez", "pulseaudio", "qemu", "virtualbox", "postgresql", "mysql",
    "redis", "nginx", "apache2", "git", "golang", "rust", "dotnet", "java"
];

const PKG_SUFFIXES = [
    "core", "dev", "common", "bin", "utils", "libs", "headers", "daemon",
    "client", "server", "extra", "base", "mod", "plugin", "jit", "engine",
    "cli", "api", "service", "tools", "config"
];

const REPOS = [
    "http://us.archive.ubuntu.com/ubuntu",
    "http://security.ubuntu.com/ubuntu",
    "http://ppa.launchpad.net/graphics-drivers/ppa/ubuntu",
    "https://download.docker.com/linux/ubuntu",
    "https://packages.cloud.google.com/apt",
    "http://apt.postgresql.org/pub/repos/apt"
];

const DISTROS = ["focal", "jammy", "noble", "bionic", "xenial"];
const SECTIONS = ["main", "restricted", "universe", "multiverse"];

// --- Helpers ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms * CONFIG.speed));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generatePackageName = () => {
    return `${randomItem(PKG_PREFIXES)}-${randomItem(PKG_SUFFIXES)}`;
};

const generateVersion = () => {
    return `${randomInt(0, 9)}.${randomInt(0, 20)}.${randomInt(0, 99)}-${randomInt(1, 5)}ubuntu${randomInt(1, 4)}`;
};

// --- Display Helpers ---
const write = (text) => process.stdout.write(text);
const clearLine = () => {
    if (process.stdout.clearLine) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    } else {
        write('\r' + ' '.repeat(process.stdout.columns || 80) + '\r');
    }
};

const printCommand = async (cmd) => {
    const prompt = buildPrompt();
    await sleep(randomInt(200, 500));
    write(`${prompt}${C.text}${cmd}${C.reset}\n`);
    await sleep(randomInt(100, 300));
};

// --- Progress Bar with Theme Support ---
async function drawProgressBar(label, style = 'blocks') {
    const width = 40;
    write('\x1b[?25l'); // Hide cursor

    for (let i = 0; i <= 100; i += randomInt(1, 4)) {
        const filled = Math.round((width * i) / 100);
        const empty = width - filled;

        let bar = '';
        if (style === 'blocks') {
            bar = `${C.progress_fill}${'█'.repeat(filled)}${C.progress_empty}${'░'.repeat(empty)}${C.reset}`;
            clearLine();
            write(`${C.bright}${label}${C.reset} ${bar} ${C.success}${i}%${C.reset}`);
        } else if (style === 'dots') {
            bar = `${C.progress_fill}${'●'.repeat(filled)}${C.progress_empty}${'○'.repeat(empty)}${C.reset}`;
            clearLine();
            write(`${C.bright}${label}${C.reset} ${bar} ${C.success}${i}%${C.reset}`);
        }

        await sleep(randomInt(5, 50));
        if (i > 85) await sleep(randomInt(20, 100));
    }

    // Finalize
    clearLine();
    if (style === 'blocks') {
        const bar = `${C.progress_fill}${'█'.repeat(width)}${C.reset}`;
        write(`${C.bright}${label}${C.reset} ${bar} ${C.success}100%${C.reset}\n`);
    }

    write('\x1b[?25h'); // Show cursor
}

// --- Simulation Stages ---
async function simAptUpdate() {
    await printCommand("sudo apt-get update");

    const lines = randomInt(15, 40);
    const distro = randomItem(DISTROS);

    for (let i = 1; i <= lines; i++) {
        const r = Math.random();
        let type = "Get";
        let color = C.info;

        if (r > 0.90) {
            type = "Ign";
            color = C.muted;
        } else if (r > 0.75) {
            type = "Hit";
            color = C.success;
        }

        const num = i;
        const repo = randomItem(REPOS);
        const section = randomItem(SECTIONS);

        let sizeStr = "";
        if (type === "Get") {
            sizeStr = ` [${C.warning}${randomInt(1000, 50000)} B${C.reset}]`;
            await sleep(randomInt(30, 100));
        } else {
            await sleep(randomInt(5, 20));
        }

        write(`${color}${type}:${num}${C.reset} ${repo} ${C.primary}${distro}${C.reset} ${section}${sizeStr}\n`);
    }

    await sleep(300);
    console.log(`${C.reset}Fetched ${C.warning}${randomInt(5000, 90000)} kB${C.reset} in ${randomInt(1, 3)}s (${C.secondary}${randomInt(500, 2000)} kB/s${C.reset})`);
    console.log(`${C.dim}Reading package lists...${C.reset} Done`);
    await sleep(500);
}

async function simAptInstall() {
    const installCount = randomInt(3, 15);
    const packages = Array.from({ length: installCount }, () => generatePackageName());
    const cmd = `sudo apt-get install -y ${packages.join(' ')}`;

    await printCommand(cmd);

    console.log(`${C.text}Reading package lists... Done${C.reset}`);
    console.log(`${C.text}Building dependency tree...${C.reset}`);
    await sleep(200);
    console.log(`${C.text}Reading state information... Done${C.reset}`);

    if (Math.random() > 0.3) {
        const depCount = randomInt(2, 6);
        const deps = Array.from({ length: depCount }, () => generatePackageName());
        console.log(`${C.primary}The following additional packages will be installed:${C.reset}`);
        console.log(`  ${C.warning}${deps.join(' ')}${C.reset}`);
    }

    console.log(`${C.success}The following NEW packages will be installed:${C.reset}`);
    console.log(`  ${C.bright}${packages.join(' ')}${C.reset}`);

    const totalSize = randomInt(10, 500);
    console.log(`${C.text}0 upgraded, ${packages.length} newly installed, 0 to remove and 3 not upgraded.${C.reset}`);
    console.log(`${C.text}Need to get ${C.warning}${totalSize} MB${C.reset}${C.text} of archives.${C.reset}`);
    console.log(`${C.text}After this operation, ${C.error}${Math.floor(totalSize * 2.5)} MB${C.reset}${C.text} of additional disk space will be used.${C.reset}`);

    await sleep(800);

    // Download phase
    for (let i = 0; i < packages.length; i++) {
        const pkg = packages[i];
        const ver = generateVersion();
        const size = randomInt(100, 8000);
        write(`${C.info}Get:${i + 1}${C.reset} ${REPOS[0]} ${C.primary}${randomItem(DISTROS)}/main${C.reset} amd64 ${C.success}${pkg}${C.reset} amd64 ${ver} [${C.warning}${size} kB${C.reset}]\n`);
        await sleep(randomInt(20, 150));
    }

    await sleep(500);
    console.log(`${C.dim}${'-'.repeat(60)}${C.reset}`);

    // Progress bar with theme
    await drawProgressBar('Reading database ...', 'blocks');

    console.log(`${C.dim}(Reading database ... ${randomInt(150000, 400000)} files and directories currently installed.)${C.reset}`);

    for (const pkg of packages) {
        const ver = generateVersion();
        console.log(`${C.text}Preparing to unpack .../${C.primary}${pkg}_${ver}_amd64.deb${C.reset}${C.text} ...${C.reset}`);
        await sleep(randomInt(20, 100));
        console.log(`${C.text}Unpacking ${C.bright}${pkg}${C.reset}${C.text} (${ver}) ...${C.reset}`);
        await sleep(randomInt(50, 200));
    }

    await sleep(400);
    console.log(`${C.dim}Setting up triggers for man-db (2.10.2-1) ...${C.reset}`);

    for (const pkg of packages) {
        const ver = generateVersion();
        console.log(`${C.text}Setting up ${C.success}${pkg}${C.reset}${C.text} (${ver}) ...${C.reset}`);

        if (Math.random() > 0.7) {
            await drawProgressBar(`Compiling ${pkg} modules`, 'blocks');
        }
        await sleep(randomInt(50, 300));
    }
}

// --- Main Loop ---
async function run() {
    console.clear();

    // Banner with theme
    console.log(`${C.success}╔${'═'.repeat(58)}╗${C.reset}`);
    console.log(`${C.success}║${C.reset}  Install Nothing - Fake Package Manager Simulator  ${C.success}║${C.reset}`);
    console.log(`${C.success}║${C.reset}  Theme: ${C.primary}${THEMES[CONFIG.theme].name}${C.reset} | Style: ${C.primary}${STYLES[CONFIG.style].name}${C.reset}${' '.repeat(13)}${C.success}║${C.reset}`);
    console.log(`${C.success}╚${'═'.repeat(58)}╝${C.reset}\n`);

    console.log(`${C.success}User:${C.reset} ${CONFIG.username}`);
    console.log(`${C.success}Host:${C.reset} ${CONFIG.hostname}`);
    console.log(`${C.dim}System Check: OK${C.reset}\n`);

    while (true) {
        const action = Math.random();

        if (action > 0.65) {
            await simAptUpdate();
        } else {
            await simAptInstall();
        }

        await sleep(randomInt(800, 2000));
    }
}

process.on('SIGINT', () => {
    write('\x1b[?25h'); // Ensure cursor is visible
    console.log(`\n${C.error}✖ ABORTED BY USER${C.reset}`);
    process.exit(0);
});

// Export the run function so cli.js can call it
module.exports = {
    run
};