const conn = require('../config/database')

const getAllRecipe = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users ORDER BY id_recipe ASC`,
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

const getCount = (data) => {
	return new Promise((resolve, reject) => {
    const { limit, page } = data
		conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users LIMIT $1 OFFSET $2`, [limit, page],
			(err, res) => {
				if (err) {
					reject(new Error(`SQL : ${err.message}`))
				} else {
					resolve(res)
				}
			},
		);
	});
};

const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users WHERE id_recipe = $1`, [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      }
    )
  })
}

const getRecipeByName = (name) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users WHERE name_recipe = $1`, [name],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      }
    )
  })
}

/* const getRecipeByUser = (name) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users WHERE users.name = $1`, [name],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      }
    )
  })
} */

const getLatestRecipe = (data) => {
  return new Promise((resolve, reject) => {
    const { limit } = data
    conn.query(`SELECT recipe.id_recipe, recipe.name_recipe, recipe.ingredients, recipe.images, recipe.video, users.name, recipe.create_at
    FROM recipe INNER JOIN users ON users.id_users = recipe.id_users ORDER BY recipe.create DESC LIMIT $1`,
    [limit],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      })
  })
}

const getCreateRecipe = (data) => {
  return new Promise((resolve, reject) => {
    const { id, name, ingredients, images, video, id_user, create } = data
    conn.query('INSERT INTO recipe ( id_recipe, name_recipe, ingredients, images, video, id_users, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, name, ingredients, images, video, id_user, create],
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

const getUpdateRecipe = (data, id) => {
  return new Promise((resolve, reject) => {
    const {id,name, ingredients, images, videos, id_user } = data
    conn.query('UPDATE recipe SET id_recipe=$1, name_recipe=$2, ingredients=$3, images=$4, video=$5, id_users =$6 WHERE id_recipe = $7',
    [id, name, ingredients, images, videos, id_user, id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      })
  })
}

const getDeleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    conn.query('DELETE FROM recipe WHERE id_recipe = $1', [id],
      (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`))
        }
        resolve(res)
      })
  })
}

module.exports = {
  getAllRecipe,
  getCount,
  getRecipeById,
  getRecipeByName,
  // getRecipeByUser,
  getLatestRecipe,
  getCreateRecipe,
  getUpdateRecipe,
  getDeleteRecipe
}
