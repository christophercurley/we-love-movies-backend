const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const is_showing = req.query.is_showing;
  console.log("is_showing: ", is_showing);
  const data = await moviesService.list(is_showing);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
