// const { v4: uuidv4 } = require('uuid')
const recipeModel = require('../model/recipeModel')

const allRecipe = async (req, res) => {
  try {
    const getData = await recipeModel.getAllRecipe()
    res.send({data:getData.rows, jumlahData: getData.rowCount})
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const recipeId = async (req, res) => {
  try {
    const { id } = req.body
    const getData = await recipeModel.getRecipeById(id)
    if (getData.rowCount > 0) {
      res.send({ data: getData.rows, jumlahData: getData.rowCount })
    } else {
      res.status(404).send('Data not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Error Code')
  }
}

const recipeName = async (req, res) => {
  try {
    const { name } = req.body
    const getData = await recipeModel.getRecipeByName(name)
    if (getData.rowCount > 0) {
      res.send({ data: getData.rows, jumlahData: getData.rowCount })
    } else {
      res.status(404).send('Data not found')
    }
  } catch (error) {
    res.status(400).send('Error code')   
  }
}
const latestRecipe = async (req, res) => {
      const { limit } = req.query

      const getData = await recipeModel.getLatestRecipe({limit})
      res.send({ data: getData.rows, jumlahData: getData.rowCount })
}

const pagination = async (req, res) => {
  try {

    const {page} = req.query || 1
		const {limit} = req.query || 5

		const data = await recipeModel.getAllRecipe()
		const getData = await recipeModel.getCount({limit, page})

    if (getData) {
      res.status(200).send({ total_data: data.rowCount, result: getData.rows, page: page, limit })
    }
     res.status(404).send('Data not found')
  } catch (error) {
    console.log(error)
    res.status(400).send(`Bad Request : ${error.message}`)
  }
}

const createRecipe = async (req, res) => {
  try {
    const images = req?.file?.path

    const { id, name, ingredients, video, id_user } = req.body
    const getData = await recipeModel.getCreateRecipe({id,name,ingredients,images,video,id_user})
      if (getData < 0) {
        res.status(200).send(`Success create recipe user id ${id}`)
      } else {
       res.status(400).send('duplikat')
      }
  } catch (error) {
    console.log(error)
    res.status(404).send('Error Code')
  }
}

const updateRecipe = async (req, res) => {
  try {
    const images = req?.file?.path

    const { id, name, ingredients, videos, id_user } = req.body
    const getdata = await recipeModel.getUpdateRecipe({id, name, ingredients, images, videos, id_user})
    res.status(200).send(`Success update recipe id ${id}`)
  } catch (error) {
    console.log(error)
    res.status(400).send('Error Code')
  }
}

const deletRecipe = async (req, res) => {
  try {
    const { id } = req.body
    const getData = await recipeModel.getDeleteRecipe(id)
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
  allRecipe,
  recipeId,
  recipeName,
  pagination,
  latestRecipe,
  createRecipe,
  updateRecipe,
  deletRecipe
}
