const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const init = async () => {
  const initSql = fs.readFileSync(
    path.join(__dirname, '../db/init.sql'),
    'utf8'
  );
  await pool.query(initSql);
};

pool.on('connect', () => {
  init();
});

const get = async (key) => {
  const [type, clientId] = key.split(':');
  const result = await pool.query(
    'SELECT * FROM rate_limits WHERE client_id = $1 AND type = $2',
    [clientId, type]
  );
  return result.rows[0];
};

const set = async (key, value) => {
  const [type, clientId] = key.split(':');
  const { counter, windowStart, tokens, lastRefill } = value;

  const query = `
    INSERT INTO rate_limits (client_id, type, counter, window_start, tokens, last_refill)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (client_id, type)
    DO UPDATE SET
      counter = EXCLUDED.counter,
      window_start = EXCLUDED.window_start,
      tokens = EXCLUDED.tokens,
      last_refill = EXCLUDED.last_refill;
  `;

  const windowStartTimestamp = windowStart ? `to_timestamp(${windowStart})` : null;
  const lastRefillTimestamp = lastRefill
    ? `to_timestamp(${lastRefill / 1000.0})`
    : null;

  await pool.query(query, [
    clientId,
    type,
    counter,
    windowStartTimestamp,
    tokens,
    lastRefillTimestamp,
  ]);
};

module.exports = {
  get,
  set,
};
