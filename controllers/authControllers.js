const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../middlewares/generateToken')
const randomToken = require('/middlewares/randomToken')
const userModel = require('../model/userModel')


const register = async (req, res) => {
    try {
        const photo = req?.file?.path
        const { id, name, email, password, phone } = req.body

        const salt = bcrypt.genSaltSync(15)
        const hash = bcrypt.hashSync(password, salt)

        const data = await userModel.getUserById(id)
        const dataEmail = await userModel.getUserByEmail(email)
            if ( data.rowCount > 0 ){
                return res.status(409).send(`duplicate user`)
            } else if ( dataEmail.rowCount > 0) {
                return res.status(409).send(`duplicate email`)
            } else {
                const getData = await userModel.getCreateUser({ id, name, email, passwordn: hash, photo, phone })
                return res.status(200).send(`Success create user id ${id}`)
            }
    } catch (error) {
        console.log(error)
        return res.status(400).send(`Bad Request : ${error.message}`)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkEmail = await userModel.getUserByEmail(email)
            if(!checkEmail.rowCount > 0) {
                return res.status(400).send(`Email or password wrong`)
            }
            const result = checkEmail.rows[0]
            const checkPass = bcrypt.compareSync(password, result.password)
            if (checkPass) {
                const token = jwt.sign(
                    getUserByEmail?.rows[0],
                    "5e4abe48640c5751e0acf50c032dda3582aa09fe69e9e891e926d1a93798e8a2",
                    { expiresIn: '24h' }
                )
                res.status(200).send(token)
            } else {
                return res.status(400).send(`Email or password wrong`)
            }
    } catch (error) {
        console.log(error)
        return res.status(400).send(`Bad Request : ${error.message}`)
    }
}

/* const login2 = async (req,res) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    res.status(200)
    res.json({
        status: 'Ok',
        message: 'login succes',
        payload: {
            token: JWTAction.createJWTToken({
                username:'ayiis', 
                role: 'admin'
            }),
            data: {
                username: 'ayi', 
                role: 'admin'
            }             
        }
    })
} */

module.exports = {
    register,
    login
}