/**
 * Created by jjh on 2017/6/22.
 */
var express = require('express');
var app = express();

app.route('/express')
    .get(function (req, res) {
        res.send("这是一个/express的get请求");
    })
    .post(function (req, res) {
        res.send("这是一个/express的post请求")
    });
app.listen(1000, function () {
    console.log("app监听1000端e口")
});