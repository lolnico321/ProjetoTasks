exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').nullable();
      table.enu('status', ['pending', 'in-progress', 'completed']).defaultTo('pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
  };
  