//在app.js中调用即可开启代理

const express = require('express');
const http = require('http');
const https = require('http');
//如果第三方api是https，则以上为const https = require('https')
//下面的代码 http 处相应更改为 https，并将80端口更新为 443
const router = express.Router();
let _fn = {};
let _fns = {};
const apiHost = '';//要代理的域名地址


//转发 get 请求
router.get('/', function (req, res, next) {
    const path = req.originalUrl;
    _fn.getData(path, function (data) {
        res.send(data);
    });
});
//转发 get 请求
router.get('/getWeather', function (req, res, next) {
    const path = req.originalUrl;
    _fns.getData(path, function (data) {
        res.send(data);
    });
});

//转发 post 请求
router.post('/', function (req, res, next) {
    const path = req.originalUrl;
    const content = req.body;
    _fn.postData(path, content, function (data) {
        res.send(data);
    });
});

_fn = {//http请求
    getData: function (path, callback) {
        http.get({
            hostname: apiHost,
            port: 8092,//端口号默认80
            path: path
        }, function (res) {
            let body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                body = Buffer.concat(body);
                callback(body.toString());
            });
        });
    },
    postData: function (path, data, callback) {
        data = data || {};
        content = JSON.stringify(data);
        const options = {
            host: apiHost,
            port: 8092,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': content.length
                //根据提交请求类型不同而不同，以上适用json
                //可查询各种报头类型代表的意思
            }
        };
        const req = http.request(options, function (res) {
            let _data = '';
            res.on('data', function (chunk) {
                _data = _data + chunk;
            });
            res.on('end', function () {
                callback(_data);
            });
        });
        req.on('error', function (err) {
            console.error(err.message);
        });
        req.write(content);
        req.end();
    }
};
_fns = {//https请求
    getData: function (path, callback) {
        https.get({
            hostname: 'api.seniverse.com/v3/weather/now.json?key=vdqsbdu2eteerwup&location=changchun&language=zh-Hans&unit=c',
            port: 843,//https端口号默认80
            path: path
        }, function (res) {
            let body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                body = Buffer.concat(body);
                callback(body.toString());
            });
        });
    },
};

module.exports = router;