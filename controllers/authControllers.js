const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { 
    getUserById,
    getUserByEmail,
    getCreateUser
 } = require('../model/userModel')

module.exports = {
    register: async (req, res) => {
        try {
            const photo = req?.file?.path 
            const { name, email, password, repass, phone, level } = req.body
            // const id  = Math.floor(Math.random() * 100);
            
            // const dataUser = await getUserById(id)
            const dataEmail = await getUserByEmail(email)
            if (dataEmail?.rows[0]?.id_users < 1) {
                return res.status(409).send({msg: `incorrect`})
            } else if (dataEmail.rowCount > 0) {
                return res.status(409).send({msg: `duplicate email`})
            } else {
                if ( password == repass ) {
                    // const salt = bcrypt.genSaltSync(10)
                    bcrypt.hash (password, 10).then((hash) => {
                        const getData = getCreateUser({ name, email, password: hash, photo, phone, level})
                        return res.status(200).send({ 
                            msg: `Success create user`, 
                            data: getData.rows, 
                            amount: getData.rowCount 
                        })
                    })
                } else {
                    return res.status(400).send({msg: `incorrect password`})
                }
            }
        } catch (err) {
            return res.status(404).send({ msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const dataEmail = await getUserByEmail(email, password)
            const hashPass = dataEmail?.rows[0]?.password
            if (dataEmail.rowCount > 0) {
                bcrypt.compare(password, hashPass).then( (result) => {
                    const token = jwt.sign(
                        dataEmail.rows[0],
                        process.env.JWT_SECRET,
                        {expiresIn: '24h'}
                    )
                    return res.status(200).send({ 
                        msg: `Success login`, 
                        token: token
                    })
                })
            } else {
                return res.status(200).send({msg: `please register in application`})
            }
        } catch (error) {
            res.status(404).send({ msg: err.message})
        }
    }
}