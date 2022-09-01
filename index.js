const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const port = process.env.PORT || 8120;

const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());

app.use(
   helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
   })
);

app.use(xss());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/picture', express.static('picture'));
app.use(require('./routes/userRoute'));
app.use(require('./routes/recipeRoute'));
app.use(require('./routes/commentRoute'));
app.use(require('./routes/authRoute'));
app.use('/', (req, res) => {
   res.status(404).send('Selamat datang');
});
app.use('/*', (req, res) => {
   res.status(404).send({ error: '404', msg: `Path not found` });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
