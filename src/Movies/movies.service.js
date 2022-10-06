const knex = require("../db/connection");

function list(is_showing) {
  return is_showing
    ? knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ is_showing: true })
        .orderBy("movie_id")
        .distinct()
    : knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheatersByMovie(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "m.movie_id": movieId });
}

function stripCriticInfo(moviesData) {
  console.log("moviesData.length: ", moviesData.length);
  for (let i = 0; i < moviesData.length; i++) {
    const movieD = moviesData[i];

    movieD.critic = {};
    movieD.critic.preferred_name = movieD.preferred_name;
    movieD.critic.surname = movieD.surname;
    movieD.critic.organization_name = movieD.organization_name;

    delete movieD.preferred_name;
    delete movieD.surname;
    delete movieD.organization_name;
  }
  return moviesData;
}

function listReviewsByMovie(movie) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie.movie_id })
    .then(stripCriticInfo);
}

module.exports = {
  list,
  read,
  listTheatersByMovie,
  listReviewsByMovie,
};
