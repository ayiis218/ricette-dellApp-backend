// const deleteFile = require('../helpers/deleteFile');
const {
   getListRecipe,
   getAllRecipe,
   getRecipe,
   getCount,
   getCountRecipe,
   getRecipeById,
   getRecipeByUser,
   getLatestRecipe,
   getCreateRecipe,
   getUpdateRecipe,
   getDeleteRecipe,
} = require('../model/recipeModel');

module.exports = {
   listRecipe: async (req, res) => {
      try {
         const { page, limit } = req?.query;
         const field = req?.query?.field || 'name_recipe';
         const search = req?.query?.search || '';
         const sort = req?.query?.sort || 'id_recipe';
         const type = req?.query?.type || 'ASC';
         const pages = Number(page) || 1;
         const limits = Number(limit) || 5;
         const offset = (pages - 1) * limit;

         const count = await getCountRecipe();
         const amount = Number(count?.rows[0]?.total);
         const totalPage = Math.ceil(amount / limit);

         const getData = await getListRecipe(
            field,
            search,
            sort,
            type,
            limits,
            offset
         );
         const pagination = {
            pages: pages,
            limits: limits,
            offsets: totalPage,
            amount,
         };
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `success`,
               data: getData.rows,
               pagination,
            });
         } else {
            res.status(404).send({
               code: 404,
               msg: `Data Not Found`,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: err.message });
      }
   },

   allRecipe: async (req, res) => {
      try {
         const getData = await getAllRecipe();
         res.status(200).send({
            msg: `success`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (err) {
         res.status(404).send({ msg: err.message });
      }
   },

   recipeSearch: async (req, res) => {
      try {
         const { page, limit } = req?.query;
         const search = req?.query?.search || '';
         const pages = Number(page) || 1;
         const limits = Number(limit) || 5;
         const offset = (pages - 1) * limit;

         const getData = await getRecipe(search, limits, offset);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `success`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(400).send({
               msg: `Data Not Found`,
               data: getData.rows,
               amount: getData.rowCount,
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

   latestRecipe: async (req, res) => {
      try {
         const { limit } = req?.query || 5;
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
         const { page } = req?.query || 1;
         const { limit } = req?.query || 5;

         const getData = await getCount(limit, page);

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
         res.status(404).send({ msg: `Error Code ${err.message}` });
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
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   updateRecipe: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getRecipeById(id);
         if (getData.rowCount > 0) {
            const images = req?.file?.path || getData?.rows[0]?.images;
            const name = req?.body?.name || getData?.rows[0]?.name_recipe;
            const ingredients =
               req?.body?.ingredients || getData?.rows[0]?.ingredients;
            const video = req?.body?.video || getData?.rows[0]?.video;
            const id_user = getData?.rows[0]?.id_users;
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
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            return res.status(200).send({
               msg: `Data Not Found`,
            });
         }
      } catch (err) {
         console.log(err);
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   deleteRecipe: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getDeleteRecipe(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `success`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({ msg: `Data Not Found` });
         }
      } catch (error) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },
};
