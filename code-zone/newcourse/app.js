const http = require('node:http')

const fs = require('fs')

const hostname = "127.0.0.1";

const homepage = fs.readFileSync('./views/index.html', 'utf8')
const stylepage = fs.readFileSync('./views/style.css', 'utf8')

const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    console.log(req.url)
    if (req.url === '/about') {
        res.write(homepage);
    } else if (req.url === '/') {
        res.write(JSON.stringify({
            user: 'ahmed',
            age: 22
        }))
    } else if (req.url === '/stylepage') {
        res.write(stylepage)
    } else {
        res.statusCode = 404
        res.write('<h1>NOT FOUND PAGE 404</h1>')
    }
    res.end();
})
server.listen(port, hostname, () => {
    console.log(`web work in http://${hostname}:${port}`)
})