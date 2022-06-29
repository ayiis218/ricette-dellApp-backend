const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization
         
        const decoded = jwt.verify(
        token?.substring(7, token?.length),
        process.env.JWT_SECRET
    )

    if (decoded) {
        next()
    }
    } catch (error) {
        console.log(error)
        res.status(401).send('Token tidak valid')
    }
}

module.exports = { checkToken }