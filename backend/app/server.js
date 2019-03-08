'use strict';

require('console-stamp')(console, 'dd-mm-yyyy HH:MM:ss');

const PREFIX = '/api/v1';
const PORT = process.env.PORT;
const SERVER_HOST = process.env.SERVER_HOST;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const response = require('./shared/response');

/** routing */
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const ProfileRoute = require('./routes/profile.route');

/** middlewares */
const middlewares = require('./middlewares/index');

const app = express();

/** config routing */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** routing base */
app.get(`${PREFIX}/`, (req, res) => {
   return response.success(res, 'welcome api v1');
});

/** routing auth */
app.use(`${PREFIX}/auth`, authRoute);

/** routing profiles */
app.use(`${PREFIX}/profiles`, middlewares.AuthMiddleware.validToken, middlewares.UserEnabledMiddleware.validEnabled, ProfileRoute);

/** routing users */
app.use(`${PREFIX}/users`, middlewares.AuthMiddleware.validToken, middlewares.UserEnabledMiddleware.validEnabled, userRoute);

// server corriendo
app.listen(PORT, SERVER_HOST, () => {
   console.log(`Run server http://${SERVER_HOST}:${PORT}`);
});

module.exports = app;
