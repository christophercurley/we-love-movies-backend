exports.up = function (knex) {
  return knex.schema.table("critics", (table) => {
    table.renameColumn("supplier_id", "critic_id");
  });
};

exports.down = function (knex) {
  table.renameColumn("critic_id", "supplier_id");
};
