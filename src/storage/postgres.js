const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const init = async () => {
  const initSql = fs.readFileSync(
    path.join(__dirname, '../db/init.sql'),
    'utf8'
  );
  await pool.query(initSql);
};


const get = async (key) => {
  const [type, clientId] = key.split(':');
  const result = await pool.query(
    'SELECT * FROM rate_limits WHERE client_id = $1 AND type = $2',
    [clientId, type]
  );
  return result.rows[0] || null;
};

const set = async (key, value) => {
  const [type, clientId] = key.split(':');
  const { counter, windowStart, tokens, lastRefill } = value;

  const query = `
    INSERT INTO rate_limits (client_id, type, counter, window_start, tokens, last_refill)
    VALUES ($1, $2, $3, to_timestamp($4), $5, to_timestamp($6 / 1000.0))
    ON CONFLICT (client_id, type)
    DO UPDATE SET
      counter = EXCLUDED.counter,
      window_start = EXCLUDED.window_start,
      tokens = EXCLUDED.tokens,
      last_refill = EXCLUDED.last_refill;
  `;

  await pool.query(query, [
    clientId,
    type,
    counter,
    windowStart,
    tokens,
    lastRefill,
  ]);
};

module.exports = {
  init,
  get,
  set,
};
