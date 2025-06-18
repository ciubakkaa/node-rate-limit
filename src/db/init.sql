CREATE TABLE IF NOT EXISTS rate_limits (
  client_id TEXT NOT NULL,
  type TEXT NOT NULL,
  window_start TIMESTAMP,
  counter INT,
  tokens INT,
  last_refill TIMESTAMP,
  PRIMARY KEY (client_id, type)
);
