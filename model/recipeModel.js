const conn = require('../config/database');

module.exports = {
   getCountRecipe: () => {
      return new Promise((resolve, reject) => {
         conn.query(`SELECT COUNT(*) AS total FROM recipe`, (err, res) => {
            if (err) {
               reject(new Error(`SQL : ${err.message}`));
            } else {
               resolve(res);
            }
         });
      });
   },

   getListRecipe: (field, search, sort, type, limit, offset) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, users.photo, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users WHERE ${field} ILIKE ('%${search}%') ORDER BY ${sort} ${type} LIMIT $1 OFFSET $2`,
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

   getAllRecipe: () => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users ORDER BY id_recipe ASC`,
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

   getRecipe: (search) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, users.photo, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users WHERE name_recipe ILIKE ('%${search}%') ORDER BY create_at ASC`,
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

   getCount: (data) => {
      return new Promise((resolve, reject) => {
         const { page } = data;
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users ORDER BY id_recipe ASC LIMIT 5 OFFSET (($1 -1) * 5)`,
            [page],
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

   getRecipeById: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, users.photo, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users WHERE id_recipe = $1`,
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

   getRecipeByUser: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, users.photo, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users WHERE users.id_users = $1`,
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

   getLatestRecipe: (limit) => {
      return new Promise((resolve, reject) => {
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.id_users, users.name, users.photo, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users ORDER BY recipe.id_recipe DESC LIMIT $1`,
            [limit],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getPopular: (data) => {
      return new Promise((resolve, reject) => {
         const { limit } = data;
         conn.query(
            `SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at 
            FROM recipe 
            INNER JOIN users ON users.id_users = recipe.id_users ORDER BY recipe.id_recipe DESC LIMIT $1`,
            [limit],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getCreateRecipe: (data) => {
      return new Promise((resolve, reject) => {
         const { name, ingredients, images, video, id_user, create } = data;
         conn.query(
            'INSERT INTO recipe ( name_recipe, ingredients, images, video, id_users, create_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, ingredients, images, video, id_user, create],
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

   getUpdateRecipe: (data, id) => {
      return new Promise((resolve, reject) => {
         const { id, name, ingredients, images, video, id_user, create } = data;
         conn.query(
            'UPDATE recipe SET id_recipe=$1, name_recipe=$2, ingredients=$3, images=$4, video=$5, id_users=$6, create_at= $7 WHERE id_recipe = $8',
            [id, name, ingredients, images, video, id_user, create, id],
            (err, res) => {
               if (err) {
                  reject(new Error(`SQL : ${err.message}`));
               }
               resolve(res);
            }
         );
      });
   },

   getDeleteRecipe: (id) => {
      return new Promise((resolve, reject) => {
         conn.query(
            'DELETE FROM recipe WHERE id_recipe = $1',
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
