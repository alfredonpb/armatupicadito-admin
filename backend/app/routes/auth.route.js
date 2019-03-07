'use strict';

const express = require('express');

const controllers = require('../controllers/index');
const validators = require('../validators/index');

const route = express.Router();

route.post('/login', validators.LoginValidator.checkRules, validators.LoginValidator.validate, controllers.AuthController.login);

module.exports = route;
