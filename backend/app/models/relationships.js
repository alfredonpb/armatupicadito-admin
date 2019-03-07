'use strict';

/** models */
const User = require('./users');
const Profile = require('./profiles');

/** users */
User.belongsTo(Profile, { foreignKey: 'profile_id' });

/** profiles */
Profile.hasMany(User, { foreignKey: 'profile_id' });

module.exports = {
   User,
   Profile
};