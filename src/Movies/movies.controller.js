const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const is_showing = req.query.is_showing;
  const data = await moviesService.list(is_showing);
  res.json({ data });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie not found." });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
};
