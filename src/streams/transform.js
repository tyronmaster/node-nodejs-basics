import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import { Transform } from 'stream';
import { stdin, stdout, exit } from 'process';

const transform = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToReadPath = path.join(__dirname, 'files', 'filetoRead.txt');
    const fileToWritePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const readStream = process.stdin;
    const writeStream = process.stdout;

    writeStream.write('Type and press enter to start convertation (Type "exit" to finish) \n');

    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join('') + '\n');
            writeStream.write('Сonvertation finished successfully \n');
        }
    });
    readStream.pipe(reverse).pipe(writeStream);

    readStream.on('data', (data) => {
        const keyWordPosition = data.toString().indexOf('exit');
        if (keyWordPosition !== -1) {
            exit();
        }
    });
};

await transform();