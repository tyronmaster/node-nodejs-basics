import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const ERROR_MESSAGE = 'FS operation failed';
    const DIR_PATH = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(DIR_PATH);

    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err) throw new Error(ERROR_MESSAGE);
        console.log(files);
    })

};

await list();