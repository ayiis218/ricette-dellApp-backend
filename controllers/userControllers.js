const bcrypt = require('bcrypt');
const {
   getListUser,
   getAllUser,
   getCountUser,
   getUserById,
   getUserByEmail,
   getCreateUser,
   getUpdateUser,
   getDeleteUser,
} = require('../model/userModel');

module.exports = {
   listUser: async (req, res) => {
      try {
         const { page, limit } = req?.query;
         const field = req?.query?.field || 'name';
         const search = req?.query?.search || '';
         const sort = req?.query?.sort || 'id_users';
         const type = req?.query?.type || 'ASC';
         const pages = Number(page) || 1;
         const limits = Number(limit) || 5;
         const offset = (pages - 1) * limit;

         const count = await getCountUser();
         const amount = Number(count?.rows[0]?.total);
         const totalPage = Math.ceil(amount / limit);

         const getData = await getListUser(
            field,
            search,
            sort,
            type,
            limits,
            offset
         );
         if (getData.rowCount > 0) {
            const pagination = {
               pages: pages,
               limits: limits,
               offsets: totalPage,
               amount,
            };
            res.status(200).send({
               msg: `success`,
               data: getData.rows,
               pagination,
            });
         } else {
            res.status(400).send({
               code: 404,
               msg: `Data Not Found`,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   allUser: async (req, res) => {
      try {
         const getData = await getAllUser();
         res.status(200).send({
            msg: `all user data`,
            data: getData.rows,
            amount: getData.rowCount,
         });
      } catch (error) {
         return res.status(400).send({
            code: '404',
            msg: error.message,
         });
      }
   },

   UserId: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getUserById(id);
         if (getData.rowCount > 0) {
            res.status(200).send({
               msg: `user data by id ${id}`,
               data: getData.rows,
               amount: getData.rowCount,
            });
         } else {
            res.status(404).send({
               msg: 'Data not found',
               data: getData.rows,
               amount: getData.rowCount,
            });
         }
      } catch (error) {
         res.status(400).send({
            code: '404',
            msg: error.message,
         });
      }
   },

   createUser: async (req, res) => {
      try {
         const photo = req?.file?.path || 'picture/user/chef.jpg';
         const { name, email, password, repass, phone, level } = req.body;
         const dataEmail = await getUserByEmail(email);
         if (dataEmail.rowCount > 0) {
            return res.status(409).send({ msg: `duplicate email` });
         } else {
            if (password === repass) {
               bcrypt.hash(password, 10).then((hash) => {
                  const getData = getCreateUser({
                     name: name.trim(),
                     email: email.trim(),
                     password: hash,
                     photo,
                     phone: phone.trim(),
                     level,
                  });
                  return res.status(200).send({
                     msg: `Success create user`,
                     data: getData.rows,
                     amount: getData.rowCount,
                  });
               });
            } else {
               return res.status(400).send({ msg: `incorrect password` });
            }
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   updateUser: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const data = await getUserById(id);
         if (data.rowCount > 0) {
            const photo = req?.file?.path || data?.rows[0]?.photo;
            const name = req?.body?.name || data?.rows[0]?.name;
            const email = req?.body?.email || data?.rows[0]?.email;
            const password = req?.body?.password;
            const phone = req?.body?.pone || data?.rows[0]?.phone;
            const repass = req?.body.repass;
            if (password !== repass) {
               return res.status(200).send(`incorrect password`);
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const dataEmail = await getUserByEmail(email);
            if (dataEmail.rowCount > 1) {
               return res.status(409).send({ msg: `duplicate email` });
            } else {
               const getData = await getUpdateUser({
                  id,
                  name,
                  email,
                  password: hash,
                  photo,
                  phone,
               });
               return res.status(200).send({
                  msg: `Success update user id ${id}`,
                  data: getData.rows,
                  amount: getData.rowCount,
               });
            }
         } else {
            return res.status(200).send({
               msg: `Data Not Found`,
            });
         }
      } catch (err) {
         res.status(404).send({ msg: `Error Code ${err.message}` });
      }
   },

   deleteUser: async (req, res) => {
      try {
         const id = parseInt(req.params.id, 10);
         const getData = await getDeleteUser(id);
         if (getData.rowCount > 0) {
            res.status(200).send({ msg: `Success delete user id ${id}` });
         } else {
            res.status(404).send({ msg: 'Data not found' });
         }
      } catch (error) {
         res.status(400).send({
            code: '404',
            msg: error.message,
         });
      }
   },
};
