'use strict';

require('console-stamp')(console, 'dd-mm-yyyy HH:MM:ss');

const PREFIX = '/api/v1';
const PORT = process.env.PORT;
const SERVER_HOST = process.env.SERVER_HOST;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// rutas base
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ruta base
app.get(`${PREFIX}/`, (req, res) => {
   res.status(200).send({ type: 'data', message: 'Hello world!' });
});

// server corriendo
app.listen(PORT, SERVER_HOST, () => {
   console.log(`Run server in port ${PORT}`);
});

module.exports = app;
