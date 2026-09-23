const { json } = require('body-parser');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpsStatusText')
const courseController = require('./controllers/courses.controller')
const path = require('node:path');
require('dotenv').config();

const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
    console.log('mongodb connect')
})

const app = express();
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())

const courseRouter = require('./routes/courses.route')
const usersRouter = require('./routes/user.route');
app.use('/api/course', courseRouter)
app.use('/api/users', usersRouter)

// let course = [
//     {
//         id: 3,
//         title: 'JS',
//         price: 3000
//     },
//     {
//         id: 2,
//         title: 'css',
//         price: 5000
//     },
// ]

app.all('/{*splat}', (req, res, next) => {
    res.status(404).json({ status: httpStatusText.ERROR, message: 'PAGE NOT FOUND' });
})


app.use((error, req, res, next) => {
    res.status(courseController.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null })
})


app.listen(process.env.PORT || 3009, () => {
    console.log('listen according to port 3001')
}) 