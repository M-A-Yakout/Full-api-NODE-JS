const asyncWrapper = require('../middlewares/asyncWrapper.js')
const User = require('../models/user.model');
const generateJWT = require('../utils/generateJWT.js');
const httpStatusText = require('../utils/httpsStatusText.js')
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');


const getAllUsers = async (req, res) => {
    console.log(req.headers)
    //get all courses from DB using Course model 

    const query = req.query
    console.log(query)
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit // http://...../api/course?limit=2&page=5
    const user = await User.find({}, { '__v': false, 'password': false }).limit(limit).skip(skip)

    res.json({ status: httpStatusText.SUCCESS, data: { user } })
}


const register = asyncWrapper(async (req, res, next) => {
    console.log(req.body)
    const { firstName, lastName, email, password, role } = req.body;
    const oldUser = await User.findOne({ email: email })
    if (oldUser) {
        const error = res.status(400).json({ status: httpStatusText.FAIL, data: { email: 'email is already used' } });
        return next(error)
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10)

    const jwtLogin = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
    }, 'secret');


    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
        avatar: req.file.filename
    })

    //make jwt json web token create token
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role })
    console.log('token', token)
    newUser.token = token;
    await newUser.save();

    res.json({ status: httpStatusText.SUCCESS, data: { user: newUser } }).status(200)

})

const login = asyncWrapper(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email && password) {
        const error = res.status(400).json({ status: httpStatusText.FAIL, data: { message: 'email or password not correct' } });
        return next(error)
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        const error = res.status(400).json({ status: httpStatusText.FAIL, data: { message: 'User not found' } });
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password, user.password)



    if (user && matchedPassword) {
        //logged
        const token = await generateJWT({ email: user.email, id: user._id, role: user.role })

        res.json({ status: httpStatusText.SUCCESS, data: { token } })
    } else {
        const error = res.status(400).json({ status: httpStatusText.FAIL, data: { message: 'something wrong' } });
        return next(error)
    }
})


module.exports = { getAllUsers, register, login }