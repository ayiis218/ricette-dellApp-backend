// const bcrypt = require('bcrypt')

const userModel = require('../model/userModel')

const allUser = async (req, res) => {
  try {
    const { id } = req.body
    const getdata = await userModel.getAllUser(id)
    res.send({ data: getdata.rows, jumlahData: getdata.rowCount })
  } catch (error) {
    res.status(400).send('Error Code')
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
    res.status(400).send('Error Code')
  }
}

const createUser = async (req, res) => {
  try {
    const photo = req?.file?.path

    const { id, name, email, password, phone } = req.body
    const getData = await userModel.getCreateUser({ id, name, email, password, photo, phone })
    res.status(200).send(`Success create recipe user id ${id}`)
  } catch (error) {
    console.log(error)
    res.status(400).send('Error Code')
  }
}

const updateUser = async (req, res) => {
  try {
    const photo = req?.file?.path

    const {id, name, email, password, phone} = req.body
    const getdata = await userModel.getUpdateUser({id, name, email, password, photo, phone})
    res.status(200).send(`Success update recipe id ${id}`)
  } catch (err) {
    console.log(err)
    res.status(400).send('Error Code')
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
    res.status(400).send('Error Code')
  }
}


module.exports = { 
  allUser, 
  UserId,
  createUser,
  updateUser, 
  deleteUser 
}
