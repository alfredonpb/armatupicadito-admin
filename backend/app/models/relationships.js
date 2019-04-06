'use strict';

/** models */
const User = require('./user');
const Profile = require('./profile');
const TypeField = require('./type-field');
const Field = require('./field');

/** users */
User.belongsTo(Profile, { foreignKey: 'profile_id' });

/** profiles */
Profile.hasMany(User, { foreignKey: 'profile_id' });

/** types fiedls */
TypeField.hasMany(Field, { foreignKey: 'type_field_id' });

/** fields */
Field.belongsTo(TypeField, { foreignKey: 'type_field_id' });

module.exports = {
   User,
   Profile,
   TypeField
};