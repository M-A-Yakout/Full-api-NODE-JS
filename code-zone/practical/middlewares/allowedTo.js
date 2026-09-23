const appError = require("../utils/appError")

module.exports = (...roles) => {
    //[ADMIN,MANAGER , USER]
    console.log(("roles", roles))
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create('this role is not allowed', 401))
        }

        return next()
    }
}
