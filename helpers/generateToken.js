const jwt = require('jsonwebtoken')
const jwtSecret = proses.env.JWT_SECRET || 'secretword'

const verifyJWTToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
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
    }, jwtSecret, {
        expiresIn: maxValid,
        algoritma: HS256
    })
    return token
}