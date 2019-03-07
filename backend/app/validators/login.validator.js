'use strict';

const { check, validationResult } = require('express-validator/check');
const formatErrors = require('./parse-errors');

const response = require('../shared/response');

/** rules validations to user model */
const checkRules = [
   check('email').exists().isEmpty().withMessage('Email is required'),
   check('password').exists().isEmpty().withMessage('Password is required'),

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