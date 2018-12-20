const express = require('express');
const app = express();

const express_proxy = require('./server/express_proxy');
app.use('/express_proxy', express_proxy);
app.get('/indexMain.html', function (req, res) {
    res.sendFile(__dirname + "/" + "indexMain.html");
});
module.exports = app;
