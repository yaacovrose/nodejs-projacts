import { promisify } from 'util';
import * as fs from 'node:fs';
0  
const readFileAsync = promisify(fs.readFile);


function writeFiles(data){
    const jsonData = JSON.stringify(data)
    fs.writeFile('C:/nodeJs/nodejs_projact/data.products.json', jsonData, (err) => {
        if (err) throw err;
        return 'The file has been saved!'
        });
}


async function readFiles() {
    try {
        const textData = await readFileAsync('C:/nodeJs/nodejs_projact/data.products.json', 'utf8');
        return JSON.parse(textData)
    } catch (err) {
        throw err;
    }
}

const productDal = {
    writeFiles,
    readFiles,
}


export default productDal;