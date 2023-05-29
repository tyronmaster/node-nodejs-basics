import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { stdin, stdout } from 'process';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToReadPath = path.join(__dirname, 'files', 'fileToRead.txt');

    const stream = fs.createReadStream(fileToReadPath, 'utf-8');
    stream.on('data', (chunk) => {
        // add \n to imitate console.log
        process.stdout.write(chunk + '\n');
    });
    stream.on('error', (err)=>{
        process.stdout.write('File read error' + '\n');
    })

    // Write your code here
};

await read();