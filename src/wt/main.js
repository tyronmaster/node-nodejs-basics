import path from 'path';
import { stdin } from 'process';
import { fileURLToPath } from 'url';
import { Worker, workerData } from 'worker_threads';
import { stdout } from 'process';
import os  from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: 'test' });
const workersCount = os.availableParallelism(); //os.cpus().length;
const result = [];

const performCalculations = async () => {
    stdout.write('Enter a number to count fibonacci \n');
    stdin.on('data', (data) => {
        const n = parseInt(data.toString(), 10);
        if (typeof n === 'number')
            worker.postMessage(n);
    });
    worker.on('message', (msg) => {
        console.log(`Result from worker #${worker.threadId}: `, msg);
    })
};

await performCalculations();