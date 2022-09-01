const {
   getListComment,
   getAllComment,
   getCommentById,
   getCountComment,
   getCommentByRecipe,
   getCreateComment,
   getUpdateComment,
   getDeleteComment,
} = require('../model/commentModel');

module.exports = {
   listComment: async (req, res) => {
      try {
         const { page, limit } = req?.query;
         const field = req?.query?.field || 'text';
         const search = req?.query?.search || '';
         const sort = req?.query?.sort || 'id_comment';
         const type = req?.query?.type || 'ASC';
         const pages = Number(page) || 1;
         const limits = Number(limit) || 5;
         const offset = (pages - 1) * limit;

         const count = await getCountComment();
         const amount = Number(count?.rows[0]?.total);
         const totalPage = Math.ceil(amount / limit);

         const getData = await getListComment(
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

   allComment: async (req, res) => {
      try {
         const getData = await getAllComment();
         if (getData.rowCount <= 0) {
            res.status(404).send({
               msg: `Data not found`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(200).send({
               msg: `all comment`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   commentId: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getCommentById(id);
         if (getData.rowCount <= 0) {
            res.status(404).send({
               msg: `Data not found`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(200).send({
               msg: `comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   commentByRecipe: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getCommentByRecipe(id);
         if (getData.rowCount <= 0) {
            res.status(404).send({
               msg: `Data not found`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(200).send({
               msg: `comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   createComment: async (req, res) => {
      try {
         const { id_user, id_recipe, text } = req.body;
         const getData = await getCreateComment({
            text,
            id_user,
            id_recipe,
         });
         res.status(200).send({
            msg: `Success create comment id`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   updateComment: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getCommentById(id);
         if (data.rowCount > 0) {
            const text = req?.body?.text || getData.rows[0]?.text;
            const id_user = getData.rows[0]?.id_users;
            const id_recipe = getData.rows[0]?.id_recipe;
            const updateData = await getUpdateComment({
               id,
               text,
               id_user,
               id_recipe,
            });
            if (updateData) {
               res.status(200).send({
                  msg: `Success update comment id ${id}`,
                  data: updateData.rows,
                  amount: updateData.rowCount,
               });
            } else {
               res.status(400).send({
                  msg: `Update data failed ${id}`,
                  data: updateData.rows,
                  amount: updateData.rowCount,
               });
            }
         } else {
            res.status(404).send({
               msg: `Not found comment id ${id}`,
            });
         }
      } catch (err) {
         res.status(400).send({ msg: `Error Code ${err.message}` });
      }
   },

   deleteComment: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getDeleteComment(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `Success delete comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({
               msg: `Not found comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (err) {
         res.status(400).send({ msg: `Error Code ${err.message}` });
      }
   },
};
