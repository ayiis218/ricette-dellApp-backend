// const bcrypt = require('bcrypt')

const userModel = require('../model/userModel')

const allUser = async (req, res) => {
  try {
    const getdata = await userModel.getAllUser()
    res.send({ data: getdata.rows, jumlahData: getdata.rowCount })
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const UserId = async (req, res) => {
  try {
    const { id } = req.body
    const getData = await userModel.getUserById(id)
    if (getData.rowCount > 0) {
      res.send({ data: getData.rows, jumlahData: getData.rowCount })
    } else {
      res.status(404).send('Data not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const createUser = async (req, res) => {
  try {
    const photo = req?.file?.path
    const { id, name, email, password, phone } = req.body
    const data = await userModel.getUserById(id)
    const dataEmail = await userModel.getUserByEmail(email)
    if ( data.rowCount > 0 ){
      res.status(409).send(`duplicate user`)
    } else if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate email`)
    } else {
      const getData = await userModel.getCreateUser({ id, name, email, password, photo, phone })
      res.status(200).send(`Success create recipe user id ${id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const updateUser = async (req, res) => {
  try {
    const photo = req?.file?.path
    const { id, name, email, password, phone } = req.body
    const data = await userModel.getUserById(id)
    const dataEmail = await userModel.getUserByEmail(email)
    if ( data.rowCount > 0 ){
      res.status(409).send(`duplicate user`)
    } else if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate email`)
    } else {
      const getdata = await userModel.getUpdateUser({id, name, email, password, photo, phone})
      res.status(200).send(`Success update recipe id ${id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body
    const getData = await userModel.getDeleteUser(id)
    if (getData.rowCount > 0) {
      res.status(200).send(`Success delete user id ${id}`)
    } else {
      res.status(404).send('Not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}


module.exports = { 
  allUser, 
  UserId,
  createUser,
  updateUser, 
  deleteUser 
}
