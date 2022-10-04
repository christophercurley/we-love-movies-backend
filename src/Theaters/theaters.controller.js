const theatersService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list() {}

module.exports = {
  list: asyncErrorBoundary(list),
};
