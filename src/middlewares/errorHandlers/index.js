const HandleError = require('./errorHandler');

function handleErrors(error, request, response, next) {
  console.log(error);
  return HandleError(error, response);
}

module.exports = handleErrors;
