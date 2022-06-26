const commentModel = require('../model/commentModel')

const allComment = async (req, res) => {
  try {
    const { id } = req.body
    const getdata = await commentModel.getAllComment(id)
    res.send({ data: getdata.rows, jumlahData: getdata.rowCount })
  } catch (err) {
    console.log(err)
    res.status(400).send(`Error Code ${err.message}`)
  }
}

const getCommentId = async (req, res) => {
  try {
    const { id } = req.body
    const getdata = await commentModel.getCommentById(id)
    res.send({ data: getdata.rows, jumlahData: getdata.rowCount })
  } catch (err) {
    res.status(400).send(`Error Code ${err.message}`)
  }
}

/* const getComment = async (req, res) => {
    try {
        const { id } = req.params
        const result = await recipeModel.recipeById
    } catch (error) {
        return failed(res, 400, 'failed', `Bad Request : ${error.message} `)
    }
} */

const createComment = async (req, res) => {
  try {
    const { id_comment, text, id_user, id_recipe } = req.body
    const getData = await commentModel.getCreateComment({ id_comment, text, id_user, id_recipe })
    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (err) {
    console.log(err)
    res.status(400).send(`Error Code ${err.message}`)
  }
}

const updateComment = async (req, res) => {
  try {
    const { comment, id_user, id_recipe } = req.body
    const getData = await commentModel.getUpdateComment(comment, id_user, id_recipe)

    res.send({ data: getData.rows, jumlahData: getData.rowCount })

    /* if ( getData.rowCount > 0 ) {
            const getdata = await commentModel.getUpdateComment( comment, id_user, id_recipe )
            if (getdata) {
                res.send(`${message}, sukses`)
            } else {
                res.status(400).send('Error data')
            }
        } */
  } catch (err) {
    console.log(err)
    res.status(400).send(`Error Code ${err.message}`)
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body
    const getdata = await commentModel.getDeleteComment(id)
    res.status(200).send(`Success delete user id ${id}`)
  } catch (err) {
    res.status(400).send(`Error Code ${err.message}`)
  }
}

module.exports = { allComment, getCommentId, createComment, updateComment, deleteComment }
