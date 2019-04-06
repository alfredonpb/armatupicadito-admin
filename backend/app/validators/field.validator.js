'use strict';

const { check, validationResult } = require('express-validator/check');
const formatErrors = require('./parse-errors');

const response = require('../shared/response');

/** rules validations to user model */
const checkRules = [
   check('name').exists().isLength({ min: 1 }).withMessage('Name is required'),
   check('qt_players').exists().isLength({ min: 1 }).withMessage('Quantity of players is required'),
   check('type_field_id').exists().isLength({ min: 1 }).withMessage('Type field is required'),
   check('enabled').exists().isLength({ min: 1 }).withMessage('Enabled is required'),

   check('qt_players').isInt().withMessage('Quantity of players is numeric'),
   check('type_field_id').isInt().withMessage('Type field is numeric'),
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