'use strict';

const express = require('express');

const controllers = require('../controllers/index');
// const validators = require('../validators/index');

const route = express.Router();

/** filter users */
route.get('/get-by-filter', controllers.FieldController.getByFilter);

/** register users */
// route.post('/create', validators.FieldValidator.checkRules, validators.FieldValidator.validate, controllers.FieldController.register);

/** register users */
// route.put('/update/:id', validators.FieldValidator.checkRules, validators.FieldValidator.validate, controllers.FieldController.update);

module.exports = route;
