const express = require('express');
const app = express();

const express_proxy = require('./server/express_proxy');
app.use('/express_proxy', express_proxy);
app.get('/', function (req, res) {
    res.send("服务开启")
});
module.exports = app;
