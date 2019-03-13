'use strict';

const { check, validationResult } = require('express-validator/check');
const formatErrors = require('./parse-errors');

const response = require('../shared/response');

/** rules validations to user model */
const checkRules = [
   check('name').exists().isLength({ min: 1 }).withMessage('Name is required'),
   check('lastname').exists().isLength({ min: 1 }).withMessage('Lastname is required'),
   check('email').exists().isLength({ min: 1 }).withMessage('Email is required'),
   check('phone').exists().isLength({ min: 1 }).withMessage('Phone is required'),
   check('profile_id').exists().isLength({ min: 1 }).withMessage('Profile is required'),
   check('enabled').exists().isLength({ min: 1 }).withMessage('Enabled is required'),

   check('email').isEmail().withMessage('Invalid email format'),
   check('profile_id').isInt().withMessage('Porfile is numeric'),
   check('enabled').isBoolean().withMessage('Enabled is boolean')
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