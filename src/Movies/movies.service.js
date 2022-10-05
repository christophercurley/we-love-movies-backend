const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
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
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "m.movie_id": movieId });
}

const reduceReviews = reduceProperties("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

const addCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function listReviewsByMovie(movie) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie.movie_id })
    .then(reduceReviews);
}

module.exports = {
  list,
  read,
  listTheatersByMovie,
  listReviewsByMovie,
  reduceReviews,
};
