const { body } = require("express-validator")

const vaildatSchema = () => {
    return [ //! middleware method
        body('title')
            .notEmpty()
            .withMessage('title require'),
        body('title')
            .isLength({ min: 2 })
            .withMessage('title more thane 3 words'),

        body('price')
            .notEmpty()
            .withMessage('Need put price')
            .isFloat({ min: 0.01 })
            .withMessage('need more thane 0')
    ]
}

module.exports = {vaildatSchema}