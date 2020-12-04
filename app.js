require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products');

//configurando middlewares

app.use(morgan('tiny')); //activando morgan en formato 'tiny'
app.use(bodyParser.json()); //sirve para leer los archivos json que manden en el request
app.use(bodyParser.urlencoded({extended: false})); //sirve para leer los archivos enviados a través de formularios html

//creamos las rutas

app.use('/products', productsRouter);

//iniciamos el server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});