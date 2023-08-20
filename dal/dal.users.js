import { promisify } from 'util';
import * as fs from 'node:fs';

const readFileAsync = promisify(fs.readFile);


function writeFiles(data){
    const jsonData = JSON.stringify(data)
    fs.writeFile('C:/nodeJs/nodejs_projact/data.users.json', jsonData, (err) => {
        if (err) throw err;
        return 'The file has been saved!'
        });
}


async function readFiles() {
    try {
        const textData = await readFileAsync('C:/nodeJs/nodejs_projact/data.users.json', 'utf8');
        // console.log(textData)
        return JSON.parse(textData)
    } catch (err) {
        throw err;
    }
}

const usersDal = {
    writeFiles,
    readFiles,
}


export default usersDal;