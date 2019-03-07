'use strict';

const express = require('express');

const controllers = require('../controllers/index');
const validators = require('../validators/index');

const route = express.Router();

/** register users */
route.post('/', validators.UserValidator.checkRules, validators.UserValidator.validate, controllers.UserController.register);

module.exports = route;
