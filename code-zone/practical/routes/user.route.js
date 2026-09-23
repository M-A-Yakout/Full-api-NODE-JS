const express = require('express')
const router = express.Router()
const multer = require('multer')

const diskStorge = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file', file)
        cb(null, 'uploads')
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        const fileName = 'user' + Date.now() + '.' + ext
        cb(null, fileName)

        //cb = call back , ext = extions for image image/png = 0/1
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('the must be an image', 400), false)

    }
}

const upload = multer({
    storage: diskStorge,
    fileFilter
})


const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken')
const appError = require('../utils/appError')
router.get('/', verifyToken, userController.getAllUsers)
router.post('/register', upload.single('avatar'), userController.register)
router.post('/login', userController.login)

module.exports = router
