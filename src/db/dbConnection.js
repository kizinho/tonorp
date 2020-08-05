const { Sequelize } = require('sequelize');

function createSqliteDb() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite',
  });
  return sequelize;
}

function createOtherDbs(dialect) {
  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect,
  });
  return sequelize;
}

export default function createDatabase(dbname, dialect = null) {
  let storage;
  if (dialect) {
    storage = dialect;
  } else {
    storage = 'sqlite3';
  }

  if (storage === 'sqlite3') {
    createSqliteDb();
  } else {
    createOtherDbs(storage);
  }
}
