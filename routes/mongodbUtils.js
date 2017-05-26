var monk = require('monk');
var db = monk('localhost:27017/learn_db');


/*查询全部
 collectionName：表明
 callback：返回值
 */
var findALL = function (collectionName, callback) {
    var collection = db.get(collectionName);
    collection.find({}, function (err, cursor) {
        if (err) {
            console.log(err);
        }
        callback(cursor);
    })
};
/*查询全部
 collectionName：表明
 callback：返回值
 */
var findALL = function (collectionName, callback) {
    var collection = db.get(collectionName);
    collection.find({}, function (err, cursor) {
        if (err) {
            console.log(err);
        }
        callback(cursor)
        db.close();
    });
};
/*id查询
 collectionName：表明
 callback：返回值
 */
var findOne = function (id, collectionName,callback) {
    var collection = db.get(collectionName);
    collection.find({_id:id},function (err,cursor) {
        if(err){
            console.log(err);
        }
        callback(cursor[0]);
        db.close();
    });
};
/*id修改
 keys：修改的参数
 collectionName：表明
 callback：返回值
 */
var updateOne = function (id,keys, collectionName,callback) {
    var collection = db.get(collectionName);
    collection.update({_id:id},keys).then(function (err,cursor) {
        if(err){throw err};
        callback(cursor[0]);
        db.close();
    });
};
module.exports = {
    findALL: findALL,
    findOne: findOne,
    updateOne:updateOne
};