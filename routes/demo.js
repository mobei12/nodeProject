/**
 * Created by jjh on 2017/5/22.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var test = require('assert');
var url = 'mongodb://localhost:27017/learn_db';
var message = [];


MongoClient.connect(url,function (err,db) {
    if(err){
        message = "数据库连接失败！";
        return;
    }
    var collection = db.collection('user');
    var query = {};
    selectData(db, query, collection, function (result) { });
    db.close();
});
router.get('/',function (request,respond,next) {
    console.log(message)
    respond.render('demo',{ title: message });

});
//查询数据
var selectData = function (db, query, collection, callback) {
    collection.find(query, function (err, cursor) {
        if (err) {
            console.log(err)
        } else {
            cursor.each(function (error, doc) {
                if (error) {
                    console.log(error)
                }
                if (doc) {
                    message.push(doc);
                    console.log(doc);
                }
            })
        }
    })
};
module.exports = router;