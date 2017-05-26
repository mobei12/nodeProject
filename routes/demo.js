/**
 * Created by jjh on 2017/5/22.
 */
var mongodbUtils = require('./mongodbUtils');
var express = require('express');
var router = express.Router();


router.get('/select', function (request, respond) {//查询路由
    mongodbUtils.findALL('user', function (result) {
        respond.send({success:'success',dataList: result});
    });
});
router.post('/selectById', function (request, respond) {
    var id = request.body.id;
    mongodbUtils.findOne(id, 'user', function (result) {
        respond.send({success:'success',data: result});
    });
});
router.post('/editById', function (request, respond) {
    var id = request.body.id;
    var name = request.body.name;

    mongodbUtils.updateOne(id,{name:name}, 'user', function (result) {
        respond.send({success:'success'});
    });
});
router.get('/', function (request, respond, next) {
    respond.render('demo', {title: "123"});
});

module.exports = router;