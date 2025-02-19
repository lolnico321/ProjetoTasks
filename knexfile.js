module.exports = {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: 'db_tasks',
    },
    migrations: {
      directory: './db/migrations',
    },
  };
  