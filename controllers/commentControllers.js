const commentModel = require('../model/commentModel');

module.exports = {
   allComment: async (req, res) => {
      try {
         const getData = await commentModel.getAllComment();
         if (getData.rowCount <= 0) {
            res.status(400).send({
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
         const getData = await commentModel.getCommentById(id);
         if (getData.rowCount <= 0) {
            res.status(400).send({
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
         const getData = await commentModel.getCommentByRecipe(id);
         if (getData.rowCount <= 0) {
            res.status(400).send({
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
         const getData = await commentModel.getCreateComment({
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
         const getData = await commentModel.getCommentById(id);
         if (data.rowCount > 0) {
            const text = req?.body?.text || getData.rows[0]?.text;
            const id_user = getData.rows[0]?.id_users;
            const id_recipe = getData.rows[0]?.id_recipe;
            const updateData = await commentModel.getUpdateComment({
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
            res.status(400).send({
               msg: `Not found comment id ${id}`,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   deleteComment: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await commentModel.getDeleteComment(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `Success delete comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(400).send({
               msg: `Not found comment id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },
};
