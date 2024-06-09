const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "password",
  port: "port",
  database: "name",
  host: "host",
});

module.exports = {
  pool,
};
