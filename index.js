#!/usr/bin/env node

/**
 * ENDLESS FAKE INSTALLER (Artistic Edition)
 * A "useful" tool to look busy with a beautiful terminal output.
 */

const os = require('os');

// --- Configuration ---
const CONFIG = {
    hostname: 'mainframe-prod-01', // More "sci-fi" default
    username: process.env.USER || 'root',
    speed: 1.0 // Multiplier for wait times (lower is faster)
};

// --- ANSI Colors & Styles ---
const C = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    
    // Standard
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    
    // Backgrounds
    BgBlue: "\x1b[44m",
    
    // High Intensity
    Gray: "\x1b[90m",
    HiGreen: "\x1b[92m",
    HiCyan: "\x1b[96m",
    HiYellow: "\x1b[93m"
};

// --- Data Lists ---
const PKG_PREFIXES = ["lib", "gnome", "linux", "python3", "node", "docker", "k8s", "vim", "gcc", "openssl", "systemd", "x11", "wayland", "mesa", "nvidia", "amd", "intel", "cups", "bluez", "pulseaudio", "apache2", "nginx", "mysql", "postgres", "tensorflow", "pytorch", "kubelet"];
const PKG_SUFFIXES = ["core", "dev", "common", "bin", "utils", "libs", "headers", "daemon", "client", "server", "extra", "base", "mod", "plugin", "jit", "engine"];
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
    return `${randomInt(0,9)}.${randomInt(0,20)}.${randomInt(0,99)}-${randomInt(1,5)}ubuntu${randomInt(1,4)}`;
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

// Replaces the typing animation with a static, "modern shell" style prompt
const printCommand = async (cmd) => {
    // ZSH / Powerline style prompt
    // Arrow char: ➜
    const arrow = `${C.HiGreen}➜${C.Reset}`;
    const path = `${C.HiCyan}~${C.Reset}`;
    const branch = `${C.Dim}git:(${C.Red}master${C.Dim})${C.Reset}`;
    
    const prompt = `${arrow}  ${path} ${branch} ${C.Reset}`;
    
    // Small pause before "executing" to simulate system latency
    await sleep(randomInt(200, 500)); 
    
    write(`${prompt}${cmd}\n`);
    await sleep(randomInt(100, 300));
};

// --- Simulation Stages ---

async function drawProgressBar(label, style = 'blocks') {
    const width = 40;
    
    // Hide cursor
    write('\x1b[?25l');

    for (let i = 0; i <= 100; i += randomInt(1, 4)) {
        const filled = Math.round((width * i) / 100);
        const empty = width - filled;
        
        let bar = '';
        if (style === 'blocks') {
            // Artistic solid blocks
            bar = `${C.White}${ '█'.repeat(filled) }${C.Gray}${ '░'.repeat(empty) }${C.Reset}`;
            clearLine();
            write(`${C.Bright}${label}${C.Reset} ${bar} ${C.HiGreen}${i}%${C.Reset}`);
        }
        
        await sleep(randomInt(5, 50));
        if (i > 85) await sleep(randomInt(20, 100)); // Stall at end for realism
    }

    // Finalize
    clearLine();
    if (style === 'blocks') {
        const bar = `${C.White}${ '█'.repeat(width) }${C.Reset}`;
        write(`${C.Bright}${label}${C.Reset} ${bar} ${C.HiGreen}100%${C.Reset}\n`);
    }
    
    // Show cursor
    write('\x1b[?25h');
}

async function simAptUpdate() {
    await printCommand("sudo apt-get update");
    
    const lines = randomInt(15, 40);
    const distro = randomItem(DISTROS);
    
    for (let i = 1; i <= lines; i++) {
        const r = Math.random();
        let type = "Get";
        let color = C.Blue;
        
        if (r > 0.90) { type = "Ign"; color = C.Gray; }
        else if (r > 0.75) { type = "Hit"; color = C.Green; }
        
        const num = i;
        const repo = randomItem(REPOS);
        const section = randomItem(SECTIONS);
        
        let sizeStr = "";
        if (type === "Get") {
            sizeStr = ` [${C.Yellow}${randomInt(1000, 50000)} B${C.Reset}]`;
            await sleep(randomInt(30, 100));
        } else {
            await sleep(randomInt(5, 20));
        }

        // Artistic line formatting
        // Hit:1 http://archive.ubuntu.com...
        write(`${color}${type}:${num}${C.Reset} ${repo} ${C.Cyan}${distro}${C.Reset} ${section}${sizeStr}\n`);
    }
    
    await sleep(300);
    console.log(`${C.Reset}Fetched ${C.Yellow}${randomInt(5000, 90000)} kB${C.Reset} in ${randomInt(1, 3)}s (${C.Magenta}${randomInt(500, 2000)} kB/s${C.Reset})`);
    console.log(`${C.Dim}Reading package lists...${C.Reset} Done`);
    await sleep(500);
}

async function simAptInstall() {
    const installCount = randomInt(3, 15);
    const packages = Array.from({length: installCount}, () => generatePackageName());
    const cmd = `sudo apt-get install -y ${packages.join(' ')}`;
    
    await printCommand(cmd);
    
    console.log("Reading package lists... Done");
    console.log("Building dependency tree...");
    await sleep(200);
    console.log("Reading state information... Done");
    
    // Dependencies
    if (Math.random() > 0.3) {
        const depCount = randomInt(2, 6);
        const deps = Array.from({length: depCount}, () => generatePackageName());
        console.log(`${C.Cyan}The following additional packages will be installed:${C.Reset}`);
        console.log(`  ${C.Yellow}${deps.join(' ')}${C.Reset}`);
    }
    
    console.log(`${C.Green}The following NEW packages will be installed:${C.Reset}`);
    console.log(`  ${C.Bright}${packages.join(' ')}${C.Reset}`);
    
    const totalSize = randomInt(10, 500);
    console.log(`0 upgraded, ${packages.length} newly installed, 0 to remove and 3 not upgraded.`);
    console.log(`Need to get ${C.Yellow}${totalSize} MB${C.Reset} of archives.`);
    console.log(`After this operation, ${C.Red}${Math.floor(totalSize * 2.5)} MB${C.Reset} of additional disk space will be used.`);
    
    await sleep(800);
    
    // Download phase
    for (let i = 0; i < packages.length; i++) {
        const pkg = packages[i];
        const ver = generateVersion();
        const size = randomInt(100, 8000);
        // Get:1 http://... pkg [size]
        write(`${C.Blue}Get:${i+1}${C.Reset} ${REPOS[0]} ${C.Cyan}${randomItem(DISTROS)}/main${C.Reset} amd64 ${C.HiGreen}${pkg}${C.Reset} amd64 ${ver} [${C.Yellow}${size} kB${C.Reset}]\n`);
        await sleep(randomInt(20, 150));
    }
    
    // Installation phase
    await sleep(500);
    
    // Artistic separation
    console.log(`${C.Dim}------------------------------------------------------------${C.Reset}`);
    
    // Using the fancy progress bar for the "database" read
    await drawProgressBar('Reading database ...', 'blocks');
    
    console.log(`(Reading database ... ${randomInt(150000, 400000)} files and directories currently installed.)`);
    
    for (const pkg of packages) {
        const ver = generateVersion();
        console.log(`Preparing to unpack .../${C.Cyan}${pkg}_${ver}_amd64.deb${C.Reset} ...`);
        await sleep(randomInt(20, 100));
        console.log(`Unpacking ${C.Bright}${pkg}${C.Reset} (${ver}) ...`);
        await sleep(randomInt(50, 200));
    }
    
    await sleep(400);
    console.log(`${C.Dim}Setting up triggers for man-db (2.10.2-1) ...${C.Reset}`);
    
    for (const pkg of packages) {
        const ver = generateVersion();
        console.log(`Setting up ${C.HiGreen}${pkg}${C.Reset} (${ver}) ...`);
        
        // Occasional "heavy" processing bar
        if (Math.random() > 0.7) {
            await drawProgressBar(`Compiling ${pkg} modules`, 'blocks');
        }
        await sleep(randomInt(50, 300));
    }
}

// --- Main Loop ---

async function run() {
    console.clear();
    
    // Initial cool banner
    console.log(`${C.HiGreen}User:${C.Reset} ${CONFIG.username}`);
    console.log(`${C.HiGreen}Host:${C.Reset} ${CONFIG.hostname}`);
    console.log(`${C.Dim}System Check: OK${C.Reset}\n`);
    
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
    console.log(`\n${C.Red}✖ ABORTED BY USER${C.Reset}`);
    process.exit(0);
});

run();