import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const hash = crypto.createHash('sha256');

    fs.readFile(path.join(__dirname,'files', 'fileToCalculateHashFor.txt'), 'utf-8', (err, data) => {
        if(err) throw new Error('Error when read the file');
        let code = hash.update(data);
        console.log(code.digest('hex'));
    })
};

await calculateHash();