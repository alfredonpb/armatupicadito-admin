'use strict';

const express = require('express');
const controllers = require('../controllers/index');

const route = express.Router();

route.post('/', controllers.UserController.register);

module.exports = route;
