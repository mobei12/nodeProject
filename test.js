/**
 * Created by jjh on 2017/6/27.
 * jade练习
 */
var express = require('express');
var app = express();

var counter = 0;

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    counter++;
    app.locals.counter = counter.toString();
    res.render('index', {ip: req.ip});
});

app.listen(3000,function () {
    console.log("监听3000端口")
});

app.locals.title = "Welcome to Visitor";
app.locals.counter = "0";