import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
// old but stable way of JSON import
// import a from './files/a.json' assert { type: "json" };
// import b from './files/b.json' assert { type: "json" };
import * as c from './files/c.js';

// variant which looks strange
//c;

// compromise variant
const cFunc = () => c;
cFunc();

const random = Math.random();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// another way of JSON import
const loadJSON = async (filePath) =>
    fs.readFileSync(path.join(__dirname, filePath), 'utf-8', (err, data) => {
        if (err) throw console.log(`Error on Parsing var ${filePath}`);
        return JSON.parse(data);
    })
const a = await loadJSON('files/a.json');
const b = await loadJSON('files/b.json');

let unknownObject = random > 0.5 ? a : b;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

