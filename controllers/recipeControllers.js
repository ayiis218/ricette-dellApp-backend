// const deleteFile= require('../middlewares/deleteImages')
const { 
  getAllRecipe,
  getCount,
  getRecipeById,
  getRecipeByName,
  getLatestRecipe,
  getCreateRecipe,
  getUpdateRecipe,
  getDeleteRecipe
 } = require('../model/recipeModel')

module.exports = {
  allRecipe: async (req, res) => {
    try {
      const getData = await getAllRecipe()
      res.status(200).send({ 
        msg: `all recipe`, 
        data: getData.rows, 
        amount: getData.rowCount 
      })
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  },
  
  recipeId: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await getRecipeById(id)
      if (getData.rowCount > 0) {
        res.status(200).send({ 
          msg: `recipe by id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
      } else {
        res.status(404).send({msg: `Data Not Found`})
      }
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  },
  
  recipeName: async (req, res) => {
    try {
      const { name } = req.body
      const getData = await getRecipeByName(name)
      if (getData.rowCount > 0) {
        res.status(200).send({ 
          msg: `recipe by name ${name}`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
      } else {
        res.status(404).send({msg: `Data Not Found`})
      }
    } catch (error) {
      res.status(404).send({ msg: err.message})  
    }
  },
  
  latestRecipe: async (req, res) => {
    try {
      const limit = req.query
  
        const getData = await getLatestRecipe(limit)
        res.status(200).send({ 
          msg: `all new recipe`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
    } catch (err) {
      res.status(404).send({ msg: err.message})
    }
        
  },
  
  pagination: async (req, res) => {
    try {
  
      const {page} = req.query || 1
      const {limit} = req.query || 5
  
      const data = await getAllRecipe()
      const getData = await getCount({limit, page})
  
      if (getData) {
        return res.status(200).send({ total: data.rowCount, data: getData.rows, page: page, limit })
      }
      res.status(404).send({msg: `Data Not Found`})
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  },
  
  createRecipe: async (req, res) => {
    try {
      const images = req?.file?.path
      const { id, name, ingredients, video, id_user } = req.body
      const create = new Date(Date.now())
      const data = await getRecipeById(id)
        if ( data.rowCount > 0 ){
          res.status(409).send({msg: `duplicate recipe`})
        } else {
          const getData = await getCreateRecipe({id, name, ingredients, images, video, id_user, create})
          return res.status(200).send({ 
            msg: `Success create recipe id ${id}`, 
            data: getData.rows, 
            amount: getData.rowCount 
          })
        }
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  },
  
  updateRecipe: async (req, res) => {
      try {
        const images = req?.file?.path
        const { id, name, ingredients, videos, id_user } = req.body
        const data = await getRecipeById(id)
        const create = new Date(Date.now())
        await getUpdateRecipe({id, name, ingredients, images, videos, id_user, create})
          return res.status(200).send({ 
            msg: `Success update recipe by id ${id}`, 
            data: data.rows, 
            amount: data.rowCount 
          })
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  },
  
  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.body
        const getData = await getDeleteRecipe(id)
          if (getData.rowCount > 0) {
            res.status(200).send({msg: `Success delete recipe id ${id}`})
          } else {
            res.status(404).send({msg: `Data Not Found`})
          }
    } catch (error) {
      res.status(404).send({ msg: err.message})
    }
  }
}