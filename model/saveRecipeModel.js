const conn = require('../config/database')

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM saverecipe ORDER BY id ASC`, 
            (err, res) => {
                if (err) {
                    reject(new Error(`SQL : ${err.message}`))
                } else {
                    resolve(res)
                }
            })
        })
    },
    getCreate: () => {
        return new Promise((resolve, reject) => {
            const { id, id_users, id_recipe } = data 
            conn.query(`INSERT INTO saverecipe ( id, id_users, id_recipe ) VALUES ( $1, $2, $3 )`, [id, id_users, id_recipe],
            (err, res) => {
                if (err) {
                    reject(new Error(`SQL : ${err.message}`))
                } else {
                    resolve(res)
                }
            })
        })
    },
    getDelete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM saverecipe WHERE id = $1`, [id], 
            (err, res) => {
                if (err) {
                    reject(new Error(`SQL : ${err.message}`))
                } else {
                    resolve(res)
                }
            })
        })
    }
}