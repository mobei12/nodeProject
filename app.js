const express = require('express');
const app = express();

const express_proxy = require('./server/express_proxy');
app.use(express.static('html'));
app.use('/express_proxy', express_proxy);

module.exports = app;
