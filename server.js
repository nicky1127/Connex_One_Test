const express = require('express');
const promMid = require('express-prometheus-middleware');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const router = express.Router();

const app = express();

// define router middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const name = 'api.local';
const port = 5000;

app.use((req, res, next) => {
  if (req.headers.authorization !== 'mysecrettoken')
    return next(createError(403, 'Token is invalid.'));
  next();
});

app.use(router);

app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    customLabels: ['contentType'],
    transformLabels(labels, req) {
      // eslint-disable-next-line no-param-reassign
      labels.contentType = req.headers['content-type'];
    }
  })
);

// time

function getTime(req, res, next) {
  // return next(createError(404, 'Test test test'));
  const epochSeconds = Math.floor(Date.now() / 1000);
  const returned = {
    properties: {
      epoch: {
        description: 'The current server time, in epoch seconds, at time of processing the request',
        type: 'number',
        epochSeconds
      }
    },
    required: ['epoch'],
    type: 'object'
  };
  //   res.status(200).json({ data: returned });
  setTimeout(() => {
    res.status(200).json({ data: returned });
  }, 500);
}

router.get('/time', getTime);

// Express error handlers

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // check if this error is anticipated already
  if (err.expose === undefined) {
    const httpErr = createError(500);
    res.status(httpErr.status).json({ error: httpErr.message });
  } else {
    res.status(err.status).json({ error: err });
  }
});

app.listen(port, () => console.log(`${name} listening on port ${port}`));
