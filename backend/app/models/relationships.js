'use strict';

/** models */
const User = require('./user');
const Profile = require('./profile');
const TypeField = require('./type-field');

/** users */
User.belongsTo(Profile, { foreignKey: 'profile_id' });

/** profiles */
Profile.hasMany(User, { foreignKey: 'profile_id' });

module.exports = {
   User,
   Profile,
   TypeField
};