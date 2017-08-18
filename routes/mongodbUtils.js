//引入monk的模块
const monk = require('monk');
const db = monk('localhost:27017/learn_db');


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
        db.close();
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
        db.close();
        callback(cursor)
    });
};
/*id查询
 collectionName：表明
 callback：返回值
 */
var findOne = function (id, collectionName, callback) {
    var collection = db.get(collectionName);
    collection.find({_id: id}, function (err, cursor) {
        if (err) {
            console.log(err);
        }
        db.close();
        callback(cursor[0]);
    });
};
/*id修改
 keys：修改的参数
 collectionName：表明
 callback：返回值
 */
var updateOne = function (id, keys, collectionName, callback) {
    var collection = db.get(collectionName);
    collection.findOneAndUpdate({_id: id}, keys, function (err, cursor) {
        console.log("!!!" + err);
        if (err) {
            throw err
        }
        db.close();
        callback(cursor);
    });
};
/*新增
 *
 * */
var insert = function (keys, collectionName, callback) {
    var collection = db.get(collectionName);
    collection.insert(keys, function (err, cursor) {
        if (err) {
            throw  err;
        }
        db.close();
        callback(cursor);
    })

};
var deleteById = function (id, collectionName, callback) {
    var collection = db.get(collectionName);
    collection.findOneAndDelete({_id: id}, function (err, cursor) {
        if (err) {
            throw err;
        }
        db.close();
        callback(cursor);
    });
};
module.exports = {
    findALL: findALL,
    findOne: findOne,
    updateOne: updateOne,
    insert: insert,
    deleteById: deleteById
};