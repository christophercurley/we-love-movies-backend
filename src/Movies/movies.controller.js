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
  // console.log("params ", req.params);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function listTheatersByMovie(req, res) {
  const { movie: data } = res.locals;
  res.json({ data: await moviesService.listTheatersByMovie(data.movie_id) });
}

async function listReviewsByMovie(req, res) {
  const { movie } = res.locals;
  // console.log("line 33 data", movie);
  const data = await moviesService.listReviewsByMovie(movie);
  console.log("line 35 wcriticdata", data);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersByMovie: [asyncErrorBoundary(movieExists), listTheatersByMovie],
  listReviewsByMovie: [asyncErrorBoundary(movieExists), listReviewsByMovie],
};
