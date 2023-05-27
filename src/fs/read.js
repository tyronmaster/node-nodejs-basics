import FS from 'fs';
import PATH from 'path';
import { fileURLToPath } from 'url';


const read = async () => {
    const FILE_NAME = 'fileToRead.txt';
    const FILE_PATH = fileURLToPath(import.meta.url);
    const __dirname = PATH.dirname(FILE_PATH);

    /* //SIMPLE VARIANT
    FS.readFile(PATH.join(__dirname, 'files', FILE_NAME), 'utf-8', (err, data) => {
        if (err) throw new Error('FS operation failed');
        console.log(data);
    });
    */

    // VARIANT WITH STREAMS
    const MY_READ_STREAM = FS.createReadStream(PATH.join(__dirname, 'files', FILE_NAME), 'utf-8');
    MY_READ_STREAM.on('data', (chunk) => {
        if (chunk) console.log(chunk);
    });
    MY_READ_STREAM.on('error', (err) => {
        console.log('Error');
        throw new Error('FS operation failed');
    });
};

await read();