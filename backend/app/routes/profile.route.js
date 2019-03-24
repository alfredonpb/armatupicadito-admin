'use strict';

const express = require('express');

const controllers = require('../controllers/index');

const route = express.Router();

/** get all profiles */
route.get('/get-all', controllers.ProfileController.getAll);

/** delete profile */
route.delete('/delete/:id', controllers.ProfileController.destroy);

module.exports = route;
