import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToChild = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    });

    child.on('data', (data) => {
        console.log(data.toString());
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([pathToChild, 'test2', 'test3', 'close']);
