import inquirer from 'inquirer';
import { type } from 'node:os';
import fs from 'fs';


const filePath = './result.json';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'clientname',
            message: 'write your name plz'
        },
        {
            type: 'select',
            name: 'choose',
            message: 'choose your pograme',
            choices: ['js', 'html', 'css']
        },
    ])

    .then((answers) => {
        console.log(answers.choose)
        console.log(JSON.stringify(answers['clientname']))
        console.log(JSON.stringify(answers, null, 2))
        console.log('Code work')
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, 'utf8', (err, fileContent) => {
                if (err) {
                    console.log(err)
                    process.exit();
                }
                console.log('file content', fileContent)
                let fileContentAsJson = JSON.parse(fileContent);
                fileContentAsJson.push(answers)
                fs.writeFile(filePath, JSON.stringify(fileContentAsJson, null, 2),'utf8', () => {
                    console.log('File written successfully');
                });
            })
        } else {

            fs.writeFile(filePath, JSON.stringify([answers], null, 2), 'utf8', () => {
                console.log('File written successfully');
            });
        }
    })
    .catch((error) => {
        console.log(error);
    })