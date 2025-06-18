const fixedWindow = (config, storage) => async (req, res, next) => {
  const clientId = req.client.id;
  const { limit, windowSize } = config;
  const key = `rate-limit:${clientId}`;
  const now = Math.floor(Date.now() / 1000);

  let record = await storage.get(key);

  if (!record) {
    record = {
      counter: 0,
      windowStart: now,
    };
  }

  if (now > record.windowStart + windowSize) {
    record = {
      counter: 0,
      windowStart: now,
    };
  }

  if (record.counter < limit) {
    record.counter += 1;
    await storage.set(key, record);
    next();
  } else {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
};

module.exports = fixedWindow;
