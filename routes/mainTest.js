/**
 * Created by jjh on 2017/6/23.
 */
var express = require('express');
var app = express();
var routerLearn = require('./routerlearn');
app.use('/routerLearn',routerLearn);
app.listen(1000, function () {
    console.log("app监听1000端e口")
});