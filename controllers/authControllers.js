const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
/* const generateToken = require('../middlewares/generateToken')
const randomToken = require('/middlewares/randomToken') */
const userModel = require('../model/userModel')


const register = async (req, res) => {
    try {
        const photo = req?.file?.path
        const { id, name, email, password, phone } = req.body

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const data = await userModel.getUserById(id)
        const dataEmail = await userModel.getUserByEmail(email)
            if ( data.rowCount > 0 ){
                return res.status(409).send(`duplicate user`)
            } else if ( dataEmail.rowCount > 0) {
                return res.status(409).send(`duplicate email`)
            } else {
                const getData = await userModel.getCreateUser({ id, name, email, password: hash, photo, phone })
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
        const dataEmail = await userModel.getUserByEmail(email)
            if (dataEmail.rowCount > 0) {
            const checkPass = bcrypt.compare(password, dataEmail.rows[0].password)
                if (checkPass) {
                    const token = jwt.sign(
                        dataEmail?.rows[0],
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    )
                    /* const refreshToken = jwt.sign(
                        dataEmail?.rows[0],
                        process.env.REFRESH_SECRET,
                        { expiresIn: '24h' }
                    ) */
                    res.status(200).send(token)
                } else {
                    console.log(res)
                    return res.status(400).send(`Email or password wrong`)
                }
            } else {
            res.status(404).send("user tidak terdaftar")
            }
    } catch (error) {
        console.log(error)
        return res.status(404).send(`Bad Request : ${error.message}`)
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