'use strict';

const express = require('express');

const controllers = require('../controllers/index');
const validators = require('../validators/index');

const route = express.Router();

/** filter fields */
route.get('/get-by-filter', controllers.FieldController.getByFilter);

/** create field */
route.post('/create', validators.FieldValidator.checkRules, validators.FieldValidator.validate, controllers.FieldController.create);

/** register users */
route.put('/update/:id', validators.FieldValidator.checkRules, validators.FieldValidator.validate, controllers.FieldController.update);

module.exports = route;
