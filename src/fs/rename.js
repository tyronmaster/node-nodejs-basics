import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const FILE_PATH = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(FILE_PATH);
    const SOURCE_DIR = 'files';
    const currentFileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';
    const ERROR_MESSAGE = 'FS operation failed';

    fs.readdir(path.join(__dirname, SOURCE_DIR), { withFileTypes: false }, (err, files) => {
        if (err) throw new Error(ERROR_MESSAGE);
        if (!files.includes(currentFileName) || files.includes(newFileName)) throw new Error(ERROR_MESSAGE);

        fs.rename(path.join(__dirname, SOURCE_DIR, currentFileName), path.join(__dirname, SOURCE_DIR, newFileName), (err) => {
            if (err) throw new Error(ERROR_MESSAGE);
            console.log(`File ${currentFileName} successfully renamed to ${newFileName}`);
        })
    })
};

await rename();