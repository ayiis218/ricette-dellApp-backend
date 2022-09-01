const conn = require('../config/database');

module.exports = {
   getCountUser: () => {
      return new Promise((resolve, reject) => {
         conn.query(`SELECT COUNT(*) AS total FROM users`, (err, res) => {
            if (err) {
               reject(new Error(`SQL : ${err.message}`));
            } else {
               resolve(res);
            }
         });
      });
   },

   getListUser: (field, search, sort, type, limit, offset) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT * FROM users WHERE ${field} ILIKE ('%${search}%') ORDER BY ${sort} ${type} LIMIT $1 OFFSET $2`,
            [limit, offset],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getAllUser: () => {
      return new Promise((resolve, reject) => {
         conn.query('SELECT * FROM users ORDER BY id_users ASC', (err, res) => {
            if (err) {
               reject(new Error(`SQL : ${err.message}`));
            } else {
               resolve(res);
            }
         });
      });
   },

   getUserById: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            'SELECT * FROM users WHERE id_users = $1',
            [id],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getUserByEmail: (email) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT * FROM users WHERE email = $1`,
            [email],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getUserByPhone: (phone) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT * FROM users WHERE phone = $1`,
            [phone],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getCreateUser: (data) => {
      return new Promise((resolve, reject) => {
         const { name, email, password, phone, photo, level } = data;
         conn.query(
            `INSERT INTO users ( name, email, password, phone, photo, level ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *`,
            [name, email, password, phone, photo, level],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               } else {
                  resolve(res);
               }
            }
         );
      });
   },

   getUpdateUser: (data, id) => {
      return new Promise((resolve, reject) => {
         const { id, name, email, password, photo, phone } = data;
         conn.query(
            'UPDATE users SET id_users=$1, name =$2, email=$3, password=$4, photo=$5, phone=$6 WHERE id_users=$7',
            [id, name, email, password, photo, phone, id],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getDeleteUser: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            'DELETE FROM users WHERE id_users = $1',
            [id],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },
};
