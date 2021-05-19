const Pool = require("pg").Pool;
require("dotenv").config();
const keys = require("./config/keys"); // import keys from keys.js

const devConfig = {
  user: keys.postgresDb.user,
  password: keys.postgresDb.password,
  host: keys.postgresDb.host,
  port: keys.postgresDb.port,
  database: keys.postgresDb.database,
};

const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? productionConfig : devConfig
);

module.exports = pool;
