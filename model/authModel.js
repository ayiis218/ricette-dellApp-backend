const conn = require('../config/database')

module.exports = { 
    getRegister: (data) => {
        return new Promise ((resolve, reject) => {
            const { name, email, password, phone, photo, level } = data
            conn.query(`INSERT INTO users ( name, email, password, phone, photo, level ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *`, 
            [name, email, password, phone, photo,level ], (err, res) => {
                if (err) {
                    reject (new Error (`SQL : ${err.message}`))
                } else {
                    resolve(res)
                }
            })
        })
    },
    
    getUserByToken: (token) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE token = $1`, [token], (err, res) => {
              if (err) {
                reject(new Error(`SQL : ${err.message}`))
              } else {
                resolve(res)
              }
            })
        })
    },
    
    getVerifYEmail: (token) => {
        return new Promise((resolve, reject) => {
        })
    }
}