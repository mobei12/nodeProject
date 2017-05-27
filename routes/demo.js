/**
 * Created by jjh on 2017/5/22.
 */
var mongodbUtils = require('./mongodbUtils');
var express = require('express');
var router = express.Router();


router.get('/select', function (request, respond) {//查询路由
    mongodbUtils.findALL('user', function (result) {
        respond.send({success: 'success', dataList: result});
    });
});
router.post('/selectById', function (request, respond) {
    var id = request.body.id;
    mongodbUtils.findOne(id, 'user', function (result) {
        respond.send({success: 'success', data: result});
    });
});
router.post('/editById', function (request, respond) {
    var id = request.body.id;
    var data = {};
    data.name = request.body.name;
    data.phone = request.body.phone;
    data.email = request.body.email;

    mongodbUtils.updateOne(id, data, 'user', function (result) {
        respond.send({success: 'success'});
    });
});
router.post('/addData', function (request, respond) {
    var data = request.body;
    mongodbUtils.insert(data, 'user', function (result) {
        respond.send({success: 'success'});
    });
});
router.post('/deleteById', function (request, respond) {
    var id = request.body.id;
    mongodbUtils.deleteById(id, 'user', function (result) {
        respond.send({success: 'success'});
    });
});

/*
 * 初始化页面
 * */
router.get('/', function (request, respond, next) {
    respond.render('demo', {title: "123"});
});

module.exports = router;