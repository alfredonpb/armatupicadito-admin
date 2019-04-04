'use strict';

const AuthMiddleware = require('./auth.middleware');
const UserEnabledMiddleware = require('./user-enabled.middleware');
const PermissionMiddleware = require('./permission.middleware');

module.exports = {
   AuthMiddleware,
   UserEnabledMiddleware,
   PermissionMiddleware
};