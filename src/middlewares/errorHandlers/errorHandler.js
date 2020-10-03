function HandleError(error, response) {
  return response
    .status(error.status)
    .json({ error: true, message: error.message });
}

module.exports = HandleError;
