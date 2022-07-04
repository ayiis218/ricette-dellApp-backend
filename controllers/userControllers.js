const bcrypt = require('bcrypt')
const {
  getAllUser,
  getUserById,
  getUserByEmail,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
} = require('../model/userModel')

module.exports = { 
  allUser: async (req, res) => {
    try {
      const getData = await getAllUser()
      res.status(200).send({ 
        msg: `all user data`, 
        data: getData.rows, 
        amount: getData.rowCount
      })
    } catch (error) {
      return res.status(400).send({
        code: '404',
        msg: error.message
      })
    }
  },
  
  UserId: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await getUserById(id)
      if (getData.rowCount > 0) {
        res.status(200).send({ 
          msg: `user data by id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount
        })
      } else {
        res.status(404).send({msg: 'Data not found'})
      }
    } catch (error) {
      res.status(400).send({
        code: '404',
        msg: error.message
      })
    }
  },
  
  createUser: async (req, res) => {
    try {
      const photo = req?.file?.path
      const { id, name, email, password, phone } = req.body
      const data = await getUserById(id)
      const dataEmail = await getUserByEmail(email)
      if ( data.rowCount > 0 ){
        res.status(409).send(`duplicate user`)
      } else if ( dataEmail.rowCount > 0) {
        res.status(409).send(`duplicate email`)
      } else {
        const getData = await getCreateUser({ id, name, email, password, photo, phone })
        res.status(200).send({ 
          msg: `Success create user id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(`Bad Request : ${error.message}`)
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const photo = req?.file?.path
      const { id, name, email, password, repass, phone } = req.body
      if ( password !== repass ) {
        return res.status(200).send(`incorrect password`)
      }
      const salt = await bcrypt.genSalt(15)
      const hash = await bcrypt.hash(password, salt)
  
      const dataEmail = await getUserByEmail(email)
      if ( dataEmail.rowCount > 0) {
        return res.status(409).send({msg: `duplicate email`})
      } else {
        const getData = await getUpdateUser({id, name, email, password: hash, photo, phone})
        return res.status(200).send({ 
          msg: `Success update user id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount
        })
      }
    } catch (error) {
      return res.status(400).send({
        code: '404',
        msg: error.message
      })
    }
  },
  
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await getDeleteUser(id)
      if (getData.rowCount > 0) {
        res.status(200).send({msg: `Success delete user id ${id}`})
      } else {
        res.status(404).send({msg: 'Data not found'})
      }
    } catch (error) {
      res.status(400).send({
        code: '404',
        msg: error.message
      })
    }
  }
}