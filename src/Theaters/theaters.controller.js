const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
  const data = await theatersService.list();
  // console.log(data);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
