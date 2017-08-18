/**
 * Created by jjh on 2017/5/22.
 */
var mongodbUtils = require('./mongodbUtils');
//引入加密模块
const crypto = require('crypto');
var express = require('express');
var router = express.Router();


router.get('/select', function (request, response) {//查询路由
    mongodbUtils.findALL('user', function (result) {
        response.send({success: 'success', dataList: result});
    });
});
router.post('/selectById', function (request, response) {
    var id = request.body.id;
    mongodbUtils.findOne(id, 'user', function (result) {
        response.send({success: 'success', data: result});
    });
});
router.post('/editById', function (request, response) {
    var id = request.body.id;
    var data = {};
    data.name = request.body.name;
    data.phone = request.body.phone;
    data.email = request.body.email;

    mongodbUtils.updateOne(id, data, 'user', function (result) {
        response.send({success: 'success'});
    });
});
router.post('/addData', function (request, response) {
    const hash = crypto.createHash('md5');
    hash.update('123');
    var data = request.body;
    data.pwd = hash.digest('hex');
    console.log(data);
    mongodbUtils.insert(data, 'user', function (result) {
        response.send({success: 'success'});
    });
});
router.post('/deleteById', function (request, response) {
    var id = request.body.id;
    mongodbUtils.deleteById(id, 'user', function (result) {
        response.send({success: 'success'});
    });
});

/*
 * 初始化页面
 * */
router.get('/', function (request, response, next) {
    response.render('demo', {title: "用户列表页"});//渲染到demo.jade页面
});

module.exports = router;