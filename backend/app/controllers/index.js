'use strict';

const AuthController = require('./auth.controller');
const ProfileController = require('./profile.controller');
const UserController = require('./users.controller');
const SharedController = require('./shared.controller');

module.exports = {
   AuthController,
   ProfileController,
   UserController,
   SharedController
};