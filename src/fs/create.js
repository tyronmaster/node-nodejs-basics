import FS from 'fs';
import PATH from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const FILE_PATH = fileURLToPath(import.meta.url);
    const __dirname = PATH.dirname(FILE_PATH);
    const FILE_NAME = 'fresh.txt';
    const FILE_CONTENT = 'I am fresh and young';

    const completePath = PATH.join(__dirname, 'files', FILE_NAME);

    FS.stat(completePath, (err, stats) => {
        if (!err) {
            console.log(stats.birthtime);
            throw new Error('FS operation failed');
        }
        FS.writeFile(completePath, FILE_CONTENT, 'utf-8', (err) => {
            if (err) throw new Error('Error writing file');
            console.log('File created successfully!');
        })
    })



};

await create();