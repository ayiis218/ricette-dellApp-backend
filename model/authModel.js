const conn = require('../config/database')

const getregister = (data) => {
    return new Promise ((resolve, reject) => {
        const { id, name, email, password, photo, phone, level } = data
        conn.query(`INSERT INTO ( id_users, name, email, password, photo, phone, level ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *`, 
        [id, name, email, password, photo, phone,level ], (err, res) => {
            if (err) {
                reject (new Error (`SQL : ${err.message}`))
            } else {
                resolve(res)
            }
        })
    })
}

const getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE token = $1`, [token], (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`))
          } else {
            resolve(res)
          }
        })
    })
}

const getVerifikasiEmail = (token) => {
    return new Promise((resolve, reject) => {
    })
}

module.exports = { 
    getregister,
    getUserByToken,
    getVerifikasiEmail
}