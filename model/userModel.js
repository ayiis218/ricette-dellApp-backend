const conn = require('../config/database')

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM users ORDER BY id_users ASC',
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

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE id_users = $1', [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      }
    )
  })
}

const getCreateUser = (data) => {
  return new Promise((resolve, reject) => {
    const { id, name, email, password, photo, phone } = data
    conn.query('INSERT INTO users ( id_users, name, email, password, photo, phone ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, email, password, photo, phone],
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

const getUpdateUser = (data, id) => {
  return new Promise((resolve, reject) => {
    const { id, name, email, password, photo, phone } = data
    conn.query('UPDATE users SET id_users =$1, name = $2, email = $3, password = $4, photo = $5, phone = $6 WHERE id_users = $7',
      [id, name, email, password, photo, phone, id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        console.log(res)
        resolve(res)
      }
    )
  })
}

/* /* 
const updateUserPhoto = (data, id) => {
  return new Promise((resolve, reject) => {
    const { photo, update } = data
    conn.query('UPDATE users SET photo = $1, update = $2 WHERE id_users = $3',
      [photo, update, id],
      (err) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        const newRes = { id, ...data }
        resolve(newRes)
      }
    )
  })
}

const getUpdatepass = (pass, id) => {
  return new Promise((resolve, reject) => {
    conn.query('UPDATE users SET password = $1, WHERE id_users = $2',
      [pass, id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      }
    )
  })
} */

const getDeleteUser = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('DELETE FROM users WHERE id_users = $1', [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      })
  })
}

module.exports = {
  getAllUser,
  getUserById,
  getCreateUser,
  getUpdateUser,
  getDeleteUser
}
