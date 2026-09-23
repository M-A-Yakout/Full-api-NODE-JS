import http from 'http';

const server = http.createServer((req, res) => {
    if (req.url === '/home') {
        res.end('home page')
    } else if (req.url == '/about') {
        res.end(`
            <h1>about page</h1>        `);
    }
})

server.listen(3001, () => {
    console.log('easy work port 3001')
})