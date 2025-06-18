const express = require('express');
const auth = require('../middleware/auth');
const tokenBucket = require('../limiter/tokenBucket');
const inMemoryStorage = require('../storage/inMemory');

const router = express.Router();

router.get(
  '/',
  auth,
  (req, res, next) => {
    const limiter = tokenBucket(req.client.tokenBucket, inMemoryStorage);
    limiter(req, res, next);
  },
  (req, res) => {
    res.json({ success: true });
  }
);

module.exports = router;
