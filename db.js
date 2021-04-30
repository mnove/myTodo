const Pool = require("pg").Pool;
require("dotenv").config();



const devConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
        rejectUnauthorized: false
      }
}

const pool = new Pool (
  process.env.NODE_ENV === "production" ? productionConfig : devConfig,
)




module.exports = pool;
