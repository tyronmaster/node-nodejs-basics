import fs, { stat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let copyDir = (source, destination) => {
    fs.stat(source, (err, stats) => {
        if (err) throw new Error(ERROR_MESSAGE);
        if (stats.isDirectory()) {
            makeDir(destination);
            fs.readdir(source, { withFileTypes: false }, (err, files) => {
                if (err) throw new Error(ERROR_MESSAGE);
                files.forEach(element => {
                    copyDir(path.join(source, element), path.join(destination, element));
                })
            })
            console.log(`Directory ${source} successfully copied`);
        } else {
            fs.copyFile(source, destination, (err) => {
                if (err) throw new Error(ERROR_MESSAGE);
                console.log(`File ${source.slice(source.lastIndexOf('\\') + 1)} successfully copied`);
            })
        }
    })
}

let makeDir = (destination) => {
    fs.mkdir(destination, { recursive: true }, (err) => {
        if (err) throw new Error(ERROR_MESSAGE);
        console.log(`Destination folder ${destination} created`);
    })
}

const copy = async () => {
    const FOLDER_PATH = fileURLToPath(import.meta.url);
    const PATH = path.dirname(FOLDER_PATH);
    const SOURCE_FOLDER = path.join(PATH, 'files');
    const DESTINATION_FOLDER = path.join(PATH, 'files_copy');
    const ERROR_MESSAGE = 'FS operation failed';

    fs.readdir(SOURCE_FOLDER, { withFileTypes: false }, (err) => {
        if (err) throw new Error(ERROR_MESSAGE);

        fs.readdir(DESTINATION_FOLDER, { withFileTypes: false }, (err) => {
            if (!err) throw new Error(ERROR_MESSAGE);
            copyDir(SOURCE_FOLDER, DESTINATION_FOLDER);
        })
    })
};

await copy();
