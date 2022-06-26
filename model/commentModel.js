const conn = require('../config/database')

const getAllComment = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT comment.id_comment, recipe.name_recipe, comment.text, users.name FROM comment 
    INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe
    INNER JOIN users ON comment.id_users = users.id_users ORDER BY id_comment ASC`,
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        } else {
          resolve(res)
        }
      }
    )
  })
}

const getCommentById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT comment.id_comment, recipe.name_recipe, comment.text, users.name FROM comment 
    INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe 
    INNER JOIN users ON comment.id_users = users.id_users WHERE id_comment = $1`, [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        } else {
          resolve(res)
        }
      }
    )
  })
}

const getCreateComment = (data) => {
  return new Promise((resolve, reject) => {
    const  { id_comment, id_user, id_recipe, text } = data
    conn.query('INSERT INTO comment ( id_comment, id_user, id_recipe, text ) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_comment, id_user, id_recipe, text],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        } else {
          resolve(res)
        }
      }
    )
  })
}

const getUpdateComment = (data, id) => {
  return new Promise((resolve, reject) => {
    const { comment, id_user, id_recipe } = data
    conn.query('UPDATE comment SET comment = $1, id_user = $2, id_recipe = $3 WHERE id_comment = $4',
      [comment, id_user, id_recipe, id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        } else {
          resolve(res)
        }
      }
    )
  })
}

const getDeleteComment = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('DELETE FROM comment WHERE id_comment = $1', [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        } else {
          resolve(res)
        }
      }
    )
  })
}

module.exports = { getAllComment, getCommentById, getCreateComment, getUpdateComment, getDeleteComment }
