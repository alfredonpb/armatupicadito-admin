'use strict';

const express = require('express');
const controllers = require('../controllers/index');

const route = express.Router();

route.post('/login', controllers.AuthController.login);

module.exports = route;
