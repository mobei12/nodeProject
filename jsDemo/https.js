var http = require('http');
http
.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write('请求成功');
    res.end();
})
.listen(2000);