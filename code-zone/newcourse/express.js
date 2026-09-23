const express = require('express');
const { title } = require('node:process');
const fs = require('node:fs');
const morgan = require('morgan');
const app = express();
const port = 3001
const homepage = fs.readFileSync('./views/index.html', 'utf8')


// function logger() {
//     console.log('METHOD', req.method, 'URL', req.url)
// }

app.use(express.static('./views'))

app.use((req, res, next) => {
    console.log('METHOD', req.method, 'URL', req.url)
    next()
})

app.use(morgan('dev'))

app.get('/', (req, res) => {
    // logger(req)
    res.send('homepage')
})

app.get('/about', (req, res) => {
    res.send(homepage)
})

app.get('/product', (req, res) => {
    res.send([
        { id: 1, title: ' product 1' },
        { id: 2, title: ' product 2' }
    ])
})

app.listen(port, () => {
    console.log(`web work according to port ${port}`)
})

