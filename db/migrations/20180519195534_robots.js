
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('robots', (table) => {
      table.increments('id').primary();
      table.date('date_added');
      table.date('first_active');
      table.string('current_name');
      table.float('height');
      table.float('weight');
      table.integer('intelligence_metric');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('robots')
  ]);
};
