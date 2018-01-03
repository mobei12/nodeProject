/**
 * Created by jjh on 2017/12/19.
 */

 //引入mysql模块
 const mysql = require('mysql');
/** 建立链接对象
 * host:数据库链接地址
 * user:数据库用户名
 * password：数据库密码
 * database: 库名称
 */
 const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'yx_yunshang'
 })
 /**
  * 建立链接
  */
 connection.connect();
 const query = 'SELECT * FROM t_apply_approve'
 connection.query(query,function(error,results,fields){
     if(error) throw error;
     console.log("数据",results)
 })
 connection.end();