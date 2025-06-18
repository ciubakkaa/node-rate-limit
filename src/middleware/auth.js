const clients = require('../config/clients');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const clientId = authHeader.split(' ')[1];
  const client = clients[clientId];

  if (!client) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.client = client;
  next();
}

module.exports = auth;
