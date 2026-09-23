
const jet = require('jsonwebtoken')
const httpStatusText = require('../utils/httpsStatusText.js')
const appError = require('../utils/appError.js')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        const error = res.status(400).json({ status: httpStatusText.Error, data: { token: 'token is required' } });
        return next(error)
    }
    const token = authHeader.split(' ')[1]
    try {
        const currentUser = await jet.verify(token, process.env.JWT_SECRET)
        req.currentUser = currentUser
        
        next();
    } catch (err) {
        const error = res.status(400).json({ status: httpStatusText.Error, data: { token: 'token invalid' } });
        return next(error)
        
    }
    // console.log("token", token)
    // console.log(decodedToken)
}

module.exports = verifyToken 