'use strict';

const express = require('express');

const controllers = require('../controllers/index');

const route = express.Router();

/** get all profiles */
route.post('/create-entitie', controllers.SharedController.createEntitie);

module.exports = route;
