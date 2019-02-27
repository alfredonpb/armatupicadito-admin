'use strict';

require('console-stamp')(console, 'dd-mm-yyyy HH:MM:ss');

const PREFIX = '/api/v1';
const PORT = process.env.PORT;
const SERVER_HOST = process.env.SERVER_HOST;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const response = require('./shared/response');

const app = express();

// rutas base y cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ruta base
app.get(`${PREFIX}/`, (req, res) => {
   response.success(res, '¡Hola mundo!');
});

// server corriendo
app.listen(PORT, SERVER_HOST, () => {
   console.log(`Run server http://${SERVER_HOST}:${PORT}`);
});

module.exports = app;
