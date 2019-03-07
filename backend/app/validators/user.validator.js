'use strict';

const { check, validationResult } = require('express-validator/check');
const formatErrors = require('./parse-errors');

const response = require('../shared/response');

/** rules validations to user model */
const checkRules = [
   check('name').exists().isEmpty().withMessage('Name is required'),
   check('lastname').exists().isEmpty().withMessage('Lastname is required'),
   check('email').exists().isEmpty().withMessage('Email is required'),
   check('password').exists().isEmpty().withMessage('Password is required'),
   check('phone').exists().isEmpty().withMessage('Phone is required'),
   check('profile_id').exists().isEmpty().withMessage('Profile is required'),

   check('email').isEmail().withMessage('Invalid email format'),
   check('profile_id').isInt().withMessage('Porfile is numeric')
];

/** middleware by validate user register */
function validate(req, res, next) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return response.error(res, formatErrors.arrToStrErrors(errors.array()), 422);
   }

   next();

}

module.exports = { 
   checkRules, 
   validate
};