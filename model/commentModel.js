const conn = require('../config/database');

module.exports = {
   getAllComment: () => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT comment.id_comment, recipe.name_recipe, comment.text, users.name, users.photo FROM comment 
      INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe
      INNER JOIN users ON comment.id_users = users.id_users ORDER BY id_comment ASC`,
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

   getCommentById: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT comment.id_comment, recipe.name_recipe, comment.text, users.name, users.photo FROM comment 
      INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe 
      INNER JOIN users ON comment.id_users = users.id_users WHERE id_comment = $1`,
            [id],
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

   getCommentByRecipe: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT comment.id_comment, recipe.name_recipe, comment.text, users.name, users.photo FROM comment 
      INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe 
      INNER JOIN users ON comment.id_users = users.id_users WHERE id_recipe = $1`,
            [id],
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

   getCommentByRecipe: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT comment.id_comment, recipe.id_recipe, recipe.name_recipe, comment.text, users.name, users.photo FROM comment 
      INNER JOIN recipe ON comment.id_recipe = recipe.id_recipe 
      INNER JOIN users ON comment.id_users = users.id_users WHERE id_recipe = $1`,
            [id],
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

   getCreateComment: (data) => {
      return new Promise((resolve, reject) => {
         const { id_user, id_recipe, text } = data;
         conn.query(
            'INSERT INTO comment ( id_users, id_recipe, text ) VALUES ($1, $2, $3) RETURNING *',
            [id_user, id_recipe, text],
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

   getUpdateComment: (data, id) => {
      return new Promise((resolve, reject) => {
         const { id, text, id_user, id_recipe } = data;
         conn.query(
            'UPDATE comment SET id_comment = $1, text = $2, id_users = $3, id_recipe = $4 WHERE id_comment = $5',
            [id, text, id_user, id_recipe, id],
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

   getDeleteComment: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            'DELETE FROM comment WHERE id_comment = $1',
            [id],
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
};
