'use strict';

const express = require('express');

const controllers = require('../controllers/index');
const validators = require('../validators/index');

const route = express.Router();

/** filter users */
route.get('/get-by-filter', controllers.UserController.getByFilter);

/** register users */
route.post('/register', validators.UserValidator.checkRules, validators.UserValidator.validate, controllers.UserController.register);

/** register users */
route.put('/update/:id', validators.UserValidator.checkRules, validators.UserValidator.validate, controllers.UserController.update);

module.exports = route;
