const { Pool } = require("pg");
const pool = new Pool();

module.exports = {    
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.info(" Query  executed in ", duration," ms.");

    return res;
  },
  pool,
};