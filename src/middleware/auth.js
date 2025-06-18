const clients = require('../config/clients');

const auth = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = clients[req.token];
  if (!client) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.client = client;
  next();
};

module.exports = auth;
