/**
 * Created by jjh on 2017/6/22.
 */
var express = require('express');

var app = express();
app.use(function (req, res, next) {//打印每次请求时间，并继续执行下一步
    console.log('Time:', new Date(Date.now()));
    next();
});
app.route('/express')
    .get(function (req, res) {
        res.send("这是一个/express的" + req.method + "请求");
    })
    .post(function (req, res) {
        res.send("这是一个/express的post请求")
    });
app.all('/allexpress',function(req,res){
    res.send("这是一个all方法接收的请求")
})
app.listen(1000, function () {
    console.log("app监听1000端e口")
});