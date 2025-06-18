const express = require('express');
const auth = require('../middleware/auth');
const fixedWindow = require('../limiter/fixedWindow');
const persistentStorage = require('../storage/postgres');

const router = express.Router();

router.get(
  '/',
  auth,
  (req, res, next) => {
    const limiter = fixedWindow(req.client.fixedWindow, persistentStorage);
    limiter(req, res, next);
  },
  (req, res) => {
    res.json({ success: true });
  }
);

module.exports = router;
