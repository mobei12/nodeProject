/**
 * Created by jjh on 2017/6/2.
 */
'use strict';
var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var app = express();
var cnodeUrl = 'http://www.jianshu.com/u/';
app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 http://www.jianshu.com/ 的内容
    superagent.get('http://www.jianshu.com/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.title').each(function (idx, element) {
                var $element = $(element);
                var href = url.resolve(cnodeUrl, $element.attr('href'));
                items.push(href);
            });
            var ep = new eventproxy();
            var comment1Url = [];
            ep.after('end-html', 20, function (topics) {
                // topics 是个数组，包含了 多次 ep.emit('topic_html', pair) 中的那 多个个 pair
                topics = topics.map(function (topicPair) {
                    var url = topicPair[0];
                    var topicHtml  = topicPair[1];
                    var $ = cheerio.load(topicHtml);
                    var commentObj = $('.name').eq(3).text();
                    comment1Url.push(commentObj);
                    return({
                        title: $('.title').text().trim(),
                        href: url,
                        comment1: $('.name').eq(2).text()
                    })
                });
                //console.log(topics)
                console.log(comment1Url)
            });
            items.forEach(function (urlItem) {
                superagent.get(urlItem)
                    .end(function (err, res) {
                        ep.emit('end-html', [urlItem, res.text]);
                    });
            })
        });
});
app.listen(3000, function () {
    console.log('app 监听3000端口');
});