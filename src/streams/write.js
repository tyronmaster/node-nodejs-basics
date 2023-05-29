import fs from 'fs';
import path from 'path';
import process from 'process';
import { stdin, stdout, exit } from 'process';
import { fileURLToPath } from 'url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToWritePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    const stream = fs.createWriteStream(fileToWritePath, 'utf-8');
    const readStream = fs.createReadStream(fileToWritePath, 'utf-8');

    stdout.write('Type tour text to save in file: \n');
    stdout.write('type "exit" and press "enter" to finish & quite \n\n');

    stdin.on('data', (data) => {
        const keyWordPosition = data.toString().indexOf('exit');
        if (keyWordPosition !== -1) {
            stream.write(data.toString().slice(0, keyWordPosition));
            exit();
        }
        stream.write(data, (err) => {
            if (err) throw new Error('Data writing error');
        })
    })

    process.on('SIGINT', () => exit());
    process.on('exit', () => {
        stdout.write('File saved successfully');
    });
};

await write();