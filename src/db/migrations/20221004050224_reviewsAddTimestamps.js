exports.up = function (knex) {
  return knex.schema.table("reviews", (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  table.dropColumn("created_at", "updated_at");
};
