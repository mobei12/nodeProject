//千里马刷题，豆瓣前166评分计算

var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');

var ep = new eventproxy(),
    allPoint = 0, //存放总分数
    pageUrls = [],  //存放每个页面所以分数标签
    pageNum = 175;  //要爬取的页数
for (var i = 0; i < pageNum; i += 25) {
    pageUrls.push('https://movie.douban.com/top250?start=' + i + '&filter=');//要爬的网站地址
}
pageUrls.forEach(function (pageUrl,index) {
    console.log(index)
    superagent.get(pageUrl)//用superagent发送get网络请求
        .end(function (err, pres) {
            /* pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
             就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
             剩下就都是利用$ 使用 jquery 的语法了*/
            var $ = cheerio.load(pres.text);
            var pagePoint = $('.rating_num');
            for (var i = 0; i < pagePoint.length; i++) {//遍历该页面的评分标签
                var point = pagePoint.eq(i).text();
                //获取得分数据并转换为float数据类型，判断到第166个停止遍历
                if(index == 6){
                    allPoint = allPoint + parseFloat(point);
                    if(i==14){
                        break;
                    }
                }else{
                    allPoint = allPoint + parseFloat(point);
                }
            }
            console.log(allPoint)//输出
        });
});
