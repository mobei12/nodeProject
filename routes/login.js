var express = require('express');
var router = express.Router();

/*
 * 初始化页面
 * */
router.get('/', function (request, response, next) {
    response.render('login', {title: "登陆页面"});//渲染到demo.jade页面
});

module.exports = router;