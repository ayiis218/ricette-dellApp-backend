const jwt = require('jsonwebtoken')
const JWT_SECRET = proses.env.JWT_SECRET

/* const verifyJWTToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
            if (error || !decodedToken) {
                return reject(error)
            }
            resolve(decodedToken)
        })
    })
}

const createJWTToken = (sessionData, expiredTime) => {
    const maxValid = expiredTime || 3600
    const token = jwt.sign({
        data: sessionData
    }, JWT_SECRET, {
        expiresIn: maxValid,
        algoritma: HS256
    })
    return token
} */

module.exports = (payload) => {
    delete payload.password
    const token = jwt.sign(
        payload, 
        JWT_SECRET, 
        { expiresIn : `24h` }
    )
    return token
}