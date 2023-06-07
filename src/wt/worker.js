import { parentPort, workerData } from 'worker_threads';
import { stdout } from 'process';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);


const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread
    parentPort.on('message', (n) => {
        stdout.write(`Start worker with data: ${n} \n`);
        const res = nthFibonacci(n);
        parentPort.postMessage(res);
    });
};

sendResult();