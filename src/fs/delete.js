import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const FILE_PATH = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(FILE_PATH);
    const ERROR_MESSAGE = 'FS operation failed';
    const FILE_NAME = 'fileToRemove.txt';
    const dirPath = path.join(__dirname, 'files')
    const filePath = path.join(dirPath, FILE_NAME);

    fs.readdir(dirPath, (err, files) => {
        if (err) throw new Error(ERROR_MESSAGE);
        if (!files.includes(FILE_NAME)) throw new Error(ERROR_MESSAGE);
        fs.unlink(filePath, (err) => {
            if (err) throw new Error(ERROR_MESSAGE);
            console.log(`File ${FILE_NAME} deleted`);
        });
    })
};

await remove();