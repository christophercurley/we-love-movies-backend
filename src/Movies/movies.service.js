const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// I changed all movies with movie_id to "is_showing=false" in the movie_theaters table. If that causes problems with the tests, change back.

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
  // return knex("movies").select("*").where({ movie_id: movieId });
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "m.movie_id": movieId });
}

module.exports = {
  list,
  read,
  listTheatersByMovie,
};
