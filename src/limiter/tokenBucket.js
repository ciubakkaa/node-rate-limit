const tokenBucket = (config, storage) => async (req, res, next) => {
  const clientId = req.client.id;
  const { capacity, refillRate } = config;
  const key = `token-bucket:${clientId}`;

  let bucket = await storage.get(key);

  if (!bucket) {
    bucket = {
      tokens: capacity,
      lastRefill: Date.now(),
    };
  }

  const now = Date.now();
  const elapsedMilliseconds = now - bucket.lastRefill;
  const newTokens = Math.floor((elapsedMilliseconds * refillRate) / 1000);

  bucket.tokens = Math.min(capacity, bucket.tokens + newTokens);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    await storage.set(key, bucket);
    next();
  } else {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
};

module.exports = tokenBucket;
