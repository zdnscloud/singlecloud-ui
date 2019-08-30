/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
const backend = process.env.BACKEND || 'localhost';

const proxier = proxy({ target: `http://${backend}:8088`, changeOrigin: true, ws: true });

app.use(
  '/apis',
  proxier
);
app.use(
  '/web',
  proxier
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(__dirname, '..', 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz'; // eslint-disable-line
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
