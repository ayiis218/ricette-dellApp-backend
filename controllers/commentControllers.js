const commentModel = require('../model/commentModel')

module.exports = { 
  allComment: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await commentModel.getAllComment(id)
      res.status(200).send({ 
        msg: `all comment`, 
        data: getData.rows, 
        amount: getData.rowCount 
      })
    } catch (err) {
      res.status(404).send({ msg: `Error Code ${err.message}`})
    }
  },
  
  commentId: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await commentModel.getCommentById(id)
      res.status(200).send({ 
        msg: `comment id ${id}`, 
        data: getData.rows, 
        amount: getData.rowCount 
      })
    } catch (err) {
      res.status(404).send({ msg: `Error Code ${err.message}`})
    }
  },
  
  /* const commentByRecipe = async (req, res) => {
      try {
          const { name } = req.body
          const result = await recipeModel.recipeById
      } catch (error) {
          return failed(res, 400, 'failed', `Bad Request : ${error.message} `)
      }
  } */
  
  createComment: async (req, res) => {
    try {
      const {id_user, id_recipe, text } = req.body
        const getData = await commentModel.getCreateComment({ text, id_user, id_recipe })
        res.status(200).send({ 
          msg: `Success create comment id`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
    } catch (err) {
      console.log(err)
      res.status(404).send({ msg: `Error Code ${err.message}`})
    }
  },
  
  updateComment: async (req, res) => {
    try {
      const { id, text, id_user, id_recipe } = req.body
      const getData = await commentModel.getUpdateComment({id, text, id_user, id_recipe})
      res.status(200).send({ 
        msg: `Success update comment id ${id}`, 
        data: getData.rows, 
        amount: getData.rowCount 
      })
  
      /* if ( getData.rowCount > 0 ) {
              const getData = await commentModel.getUpdateComment( comment, id_user, id_recipe )
              if (getData) {
                  res.send(`${message}, sukses`)
              } else {
                  res.status(400).send('Error data')
              }
          } */
    } catch (err) {
      console.log(err)
      res.status(404).send({ msg: `Error Code ${err.message}`})
    }
  },
  
  deleteComment: async (req, res) => {
    try {
      const { id } = req.body
      const getData = await commentModel.getDeleteComment(id)
      if (getData.rowCount > 0) {
        res.status(200).send({ 
          msg: `Success delete comment id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
      } else {
        res.status(400).send({ 
          msg: `Not pound comment id ${id}`, 
          data: getData.rows, 
          amount: getData.rowCount 
        })
      }
    } catch (err) {
      res.status(404).send({ msg: `Error Code ${err.message}`})
    }
  }
}
