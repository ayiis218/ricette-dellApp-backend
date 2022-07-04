require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = { 
    tokenVerify: async (req, res, next) => {
        try {
            const token = req.headers?.authorization

            if (!token) {
                return res.status(403).send({ 
                    msg: `please login to access`,
                    error: `forbidden`
                })    
            }
            // token = token.split('')[1]
             
            const decoded = jwt.verify(
                token?.substring(7, token?.length),
                process.env.JWT_SECRET
            )
            if (decoded) return next()
        } catch (error) {
            return res.status(401).send({ 
                msg: `Invalid token access`,
                error: `Unauthorized`
            })    
        }
    }
 }