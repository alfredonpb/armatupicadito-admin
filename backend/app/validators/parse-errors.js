'use strict';

function arrToStrErrors(errors) {
   let str = 'Fiels invalids: ';

   errors.forEach((error, index) => {
      let separator = '';
      if (errors.length != (index + 1)) { separator = ' | '; }

      str += `${error.msg}${separator}`;
   });

   return str;
}

module.exports = {
   arrToStrErrors
};