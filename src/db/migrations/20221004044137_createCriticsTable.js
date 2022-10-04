exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("supplier_id").primary();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
