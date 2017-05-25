var monk = require('monk');
var db = monk('localhost:27017/learn_db');


/*查询方法
 query：条件，
 collectionName：表明
 callback：返回值
 */
var selectData = function ( query, collectionName, callback) {
    var collection = db.get(collectionName);
    collection.find(query, function (err, cursor) {
        if (err) {
            console.log(err);
        }
        callback(cursor);
    })
};
module.exports = {
    selectData:selectData
};