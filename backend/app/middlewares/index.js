'use strict';

const AuthMiddleware = require('./auth.middleware');
const UserEnabledMiddleware = require('./user-enabled.middleware');
const SuperadminMiddleware = require('./superadmin.middleware');

module.exports = {
   AuthMiddleware,
   UserEnabledMiddleware,
   SuperadminMiddleware
};