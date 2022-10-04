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

module.exports = {
  list,
};
