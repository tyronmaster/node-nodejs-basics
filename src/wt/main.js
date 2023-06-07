import path from 'path';
import { fileURLToPath } from 'url';
import { Worker, workerData } from 'worker_threads';
import os from 'os';
import { exit } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskPath = path.join(__dirname, 'worker.js');

const workersCount = os.availableParallelism(); //os.cpus().length;
let inputData = 10;

const performCalculations = async () => {
    // for (let i = 1; i <= workersCount; i++) {
    //     if (i == 8) inputData = 'test error';
    //     const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: inputData });
    //     worker.postMessage(inputData);
    //     inputData++;
    //     worker.on('message', (msg) => {
    //         const data = { 'status': 'resolved', 'data': msg, 'workerId': worker.threadId };
    //         result.push(data);
    //         console.log(result);
    //         return result;
    //     });
    //     worker.on('error', (err) => {
    //         const data = { 'status': 'error', 'data': null, 'workerId': worker.threadId };
    //         result.push(data);
    //         console.log(result);
    //         return result;
    //     })
    // }
    function runWorker(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(taskPath);
            worker.postMessage(data);
            worker.on('message', (msg) => {
                resolve({ 'status': 'resolved', 'data': msg, 'workerId': worker.threadId });
            })
            worker.on('error', (err) => {
                resolve({ 'status': 'error', 'data': null, 'workerId': worker.threadId });
            })
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
                exit();
            })
        })
    }

    async function run(workersCount, inputData) {
        const result = [];
        for (let i = 1; i <= workersCount; i++) {
            if (i == 8) inputData = 'test error'; // ADDED TO TEST ERROR
            result.push(await runWorker(inputData));
            inputData++;
        }
        console.log(result);
        return result;
    }

    run(workersCount, inputData);

};

await performCalculations();