// const deleteFile= require('../middlewares/deleteImages')
const {
   getAllRecipe,
   getRecipe,
   getCount,
   getRecipeById,
   getRecipeByUser,
   getRecipeByName,
   getLatestRecipe,
   getCreateRecipe,
   getUpdateRecipe,
   getDeleteRecipe,
} = require('../model/recipeModel');

module.exports = {
   allRecipe: async (req, res) => {
      try {
         const getData = await getAllRecipe();
         res.status(200).send({
            msg: `all recipe`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (err) {
         res.status(404).send({ msg: err.message });
      }
   },
   recipeSearch: async (req, res) => {
      try {
         let search = req?.params.name;
         search = search || '';
         const result = await getRecipe(search);
         if (!result.rowCount) {
            res.status(404).send({ msg: `Data Not Found` });
         } else {
            res.status(200).send({
               msg: `recipe`,
               data: result.rows,
               amount: result.rowCount,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: err.message });
      }
   },
   recipeId: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getRecipeById(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `recipe by id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({ msg: `Data Not Found` });
         }
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: err.message });
      }
   },

   myRecipe: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getRecipeByUser(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `recipe by id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({ msg: `Data Not Found` });
         }
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: err.message });
      }
   },

   recipeName: async (req, res) => {
      try {
         const { name } = req.body;
         const getData = await getRecipeByName(name);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `recipe by name ${name}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({ msg: `Data Not Found` });
         }
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: err.message });
      }
   },

   latestRecipe: async (req, res) => {
      try {
         const limit = req.query;
         const getData = await getLatestRecipe(limit);
         res.status(200).send({
            msg: `all new recipe`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (err) {
         res.status(404).send({ msg: err.message });
      }
   },

   pagination: async (req, res) => {
      try {
         const { page } = req.query || 1;
         const { limit } = req.query || 5;

         const data = await getAllRecipe();
         const getData = await getCount({ limit, page });

         if (getData) {
            return res.status(200).send({
               data: getData.rows,
               page: page,
               limit,
            });
         }
         res.status(404).send({ msg: `Data Not Found` });
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: err.message });
      }
   },

   createRecipe: async (req, res) => {
      try {
         const images = req?.file?.path || 'picture/recipe/original.jpg';
         const { name, ingredients, video, id_user } = req.body;
         const create = new Date(Date.now());
         const getData = await getCreateRecipe({
            name,
            ingredients,
            images,
            video,
            id_user,
            create,
         });
         return res.status(200).send({
            msg: `Success create recipe`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (err) {
         console.log(err);
         return res.status(404).send({ msg: err.message });
      }
   },

   updateRecipe: async (req, res) => {
      try {
         const images = req?.file?.path || 'picture/recipe/original.jpg';
         const id = parseInt(req.params.id, 10);
         const data = await getRecipeById(id);
         if (data.rowCount > 0) {
            const name = req?.body?.name || data?.rows[0]?.name_recipe;
            const ingredients =
               req?.body?.ingredients || data?.rows[0]?.ingredients;
            const video = req?.body?.video || data?.rows[0]?.video;
            const id_user = data?.rows[0]?.id_users;
            const create = new Date(Date.now());
            await getUpdateRecipe({
               id,
               name,
               ingredients,
               images,
               video,
               id_user,
               create,
            });
            return res.status(200).send({
               msg: `Success update recipe by id ${id}`,
               data: data.rows,
               amount: data.rowCount,
            });
         } else {
            return res.status(200).send({
               msg: `Data Not Found`,
            });
         }
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: err.message });
      }
   },

   deleteRecipe: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getDeleteRecipe(id);
         if (getData.rowCount > 0) {
            res.status(200).send({ msg: `Success delete recipe id ${id}` });
         } else {
            res.status(404).send({ msg: `Data Not Found` });
         }
      } catch (error) {
         res.status(404).send({ msg: err.message });
      }
   },
};
