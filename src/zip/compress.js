import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { Gzip, createGzip } from 'zlib';
import { pipeline } from 'stream';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

    // variant 1
    // const compressor = (sourcePath, destinationPath) => {
    //     const handleStream = createReadStream(sourcePath);
    //     handleStream
    //         .pipe(createGzip())
    //         .pipe(createWriteStream(destinationPath))
    //         .on('finish', () => {
    //             process.stdout.write('Compression done');
    //         })
    // }
    // compressor(sourceFilePath, compressedFilePath);

    // variant 2
    const source = fs.createReadStream(sourceFilePath);
    const destination = fs.createWriteStream(compressedFilePath);
    const gzip = createGzip();
    pipeline(source, gzip, destination, (err) => {
        if(err) {
            process.stderr('Compression failed')
        }
    })

};

await compress();