// const process = require("node:process")

// console.log('hello world')

// console.log(process.argv)

// if(process.argv[2] == 'add'){
//     console.log('you are add course with name', process.argv[3])
// }

import { Command } from 'commander';

import fs from 'fs';
import inquirer from 'inquirer';
import { type } from 'node:os';

// inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'nameuruser',
//             message: 'write your name',
//             choices: ['cool', 'hi'],

//         }
//     ])
//     .then((answers) => {
//         console.log(answers)
//     })
//     .catch((error) => {
//         if (error.isTtyError) {
//             // Prompt couldn't be rendered in the current environment
//         } else {
//             // Something else went wrong
//         }
//     });


const program = new Command();
program
    .name('Code Zon')
    .description('CLI to some JavaScript string utilities')
    .version('1.0.0');


program
    .command('add')
    .alias('a')
    .description('Add a course')
    .argument("<title>", "add course title")
    .option("--price <price>", "add course price")
    .action((param, option) => {
        console.log('param, option', param, option)
        const content = JSON.stringify({ title: param, price: option.price }, null, 2)
        fs.writeFile('result.json', content, 'utf8', (err) => {
            if (err) throw err
            console.log('file create')
        })
    })


program
    .command('list')
    .alias('l')
    .description('List all  course')
    .action(() => {
        fs.readFile('result.json', 'utf-8', (err, data) => {
            if (err) throw err
            else {
                console.log(JSON.parse(data,null,2))
            }
        })
    })

program.parse(process.argv)


