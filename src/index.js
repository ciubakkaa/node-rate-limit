require('dotenv').config();
const express = require('express');
const bearerToken = require('express-bearer-token');
const fooRouter = require('./routes/foo');
const barRouter = require('./routes/bar');

const app = express();
const port = process.env.PORT || 3000;

app.use(bearerToken());
app.use('/foo', fooRouter);
app.use('/bar', barRouter);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  if (process.env.DATABASE_URL) {
    const postgres = require('./storage/postgres');
    postgres.init();
  }
});

module.exports = server;
