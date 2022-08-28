const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
   getUserById,
   getUserByEmail,
   getCreateUser,
   getUserByPhone,
} = require('../model/userModel');

module.exports = {
   register: async (req, res) => {
      try {
         const photo = req?.file?.path || 'picture/user/chef.jpg';
         const { name, email, password, repass, phone, level } = req.body;
         const dataEmail = await getUserByEmail(email);
         const dataPhone = await getUserByPhone(phone);
         if (dataEmail.rowCount > 0) {
            return res.status(409).send({ msg: `duplicate email` });
         } else if (dataPhone.rowCount > 0) {
            return res.status(409).send({ msg: `Phone is unique` });
         } else {
            if (password === repass) {
               const pass = bcrypt.hashSync(password, 10);
               const getData = getCreateUser({
                  name: name.trim(),
                  email: email.trim(),
                  password: pass,
                  photo,
                  phone: phone.trim(),
                  level,
               });
               return res.status(200).send({
                  msg: `Success create user`,
                  data: getData.rows,
                  amount: getData.rowCount,
               });
            } else {
               return res.status(400).send({ msg: `incorrect password` });
            }
         }
      } catch (err) {
         return res.status(404).send({ msg: err.message });
      }
   },
   login: async (req, res) => {
      try {
         const { email, password } = req.body;
         const dataEmail = await getUserByEmail(email);
         const hashPass = dataEmail.rows[0]?.password;
         if (!dataEmail.rowCount) {
            return res
               .status(200)
               .send({ msg: `please register in application` });
         } else {
            const pass = bcrypt.compareSync(password, hashPass);
            if (pass) {
               const token = jwt.sign(
                  dataEmail.rows[0],
                  process.env.JWT_SECRET,
                  { expiresIn: '24h' }
               );
               res.send({
                  msg: `Success login`,
                  token: token,
                  data: [dataEmail.rows[0].id_users, dataEmail.rows[0].name],
               });
            } else {
               res.status(404).send({ msg: 'incorrect password' });
            }
         }
      } catch (error) {
         res.status(404).send({ msg: err.message });
      }
   },
};
