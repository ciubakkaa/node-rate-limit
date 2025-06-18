require('dotenv').config();
const express = require('express');
const fooRouter = require('./routes/foo');
const barRouter = require('./routes/bar');

const app = express();
const port = process.env.PORT || 3000;

app.use('/foo', fooRouter);
app.use('/bar', barRouter);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
