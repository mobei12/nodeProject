/**
 * Created by jjh on 2017/5/22.
 */
var mongodbUtils = require('./mongodbUtils');
var express = require('express');
var router = express.Router();


router.get('/select',function (request,respond,next) {
    console.log("11")
    mongodbUtils.selectData({},'user',function (result) {
        respond.json(result);
    });
});
router.get('/',function (request,respond,next) {
    respond.render('demo',{ title: "123" });
});

module.exports = router;