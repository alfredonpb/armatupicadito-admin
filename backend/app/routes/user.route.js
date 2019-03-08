'use strict';

const express = require('express');

const controllers = require('../controllers/index');
const validators = require('../validators/index');

const route = express.Router();

/** register users */
route.post('/register', validators.UserValidator.checkRules, validators.UserValidator.validate, controllers.UserController.register);

/** filter users */
route.get('/get-by-filter', controllers.UserController.getByFilter);

module.exports = route;
