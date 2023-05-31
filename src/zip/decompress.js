import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import { stdin, stdout } from 'process';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';


const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
    const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const source = fs.createReadStream(sourceFilePath);
    const destination = fs.createWriteStream(decompressedFilePath);
    const gUnzip = createUnzip();

    pipeline(source, gUnzip, destination, (err) => {
        if(err) {
            process.stderr('Decompression failed')
        }
    })
};

await decompress();