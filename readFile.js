import * as fs from 'node:fs';
import path from 'node:path';
import { callbackify } from 'node:util';


// fs.readFile('./test.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log("ERROR reading file", err)
//     } else {
//         console.log('your file =>', data)
//     }
// })


// fs.writeFile('./user.json', JSON.stringify([{ user: "ahmed", id: 2 }]), 'utf-8', (err) => {
//     if (err) {
//         console.log("there error ", err)
//     } else {
//         console.log('done')
//     }
// })

// fs.unlink('./user.json', (err) => {
//     if (err) {
//         console.log('error message ', err)
//     } else {
//         console.log('done delete')
//     }
// })


console.log(Buffer.from("a").toJSON())
console.log(Buffer.from("a"))






const rstream = fs.createReadStream('./test.txt', 'utf8');
const writesteam = fs.createWriteStream('./outputTest.txt', 'utf8')

rstream.on('data', (chunk) => {
    console.log('======chunk======', chunk);
    writesteam.write('\n chunk !!!!!!!! \n')
    writesteam.write(chunk);
})
