'use strict';

const express = require('express');

const controllers = require('../controllers/index');

const route = express.Router();

/** get all types of fields */
route.get('/get-all', controllers.TypeFieldController.getAll);

/** delete type of field */
route.delete('/delete/:id', controllers.TypeFieldController.destroy);

module.exports = route;
