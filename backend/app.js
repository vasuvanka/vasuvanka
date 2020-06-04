const express = require('express');
const { appConfig } = require('./src/constants')
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const apiMetrics = require('prometheus-api-metrics');
const api = require('./src/routes')
const app = express();
// const path = require('path')
const compression = require("compression");
app.use(compression());
app.use(morgan(appConfig.MORGAN))
app.use(cors(appConfig.CORS))
app.use(bodyParser.json());

app.use('/api/v1', api);
// app.use(apiMetrics())
app.use((req, res, next) => {
    const err = new Error('not found')
    err.code = 404
    next(err)
})
app.use((err, req, res, next) => {
    res.status(err.code || 500).send({ message: err.message || 'internal error' })
})

const http = require('http')
const server = http.createServer(app)
server.listen(appConfig.PORT, () => console.log(`Listening on port ${appConfig.PORT}!`));