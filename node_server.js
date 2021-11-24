var express = require('http');
var fs = require('fs');
var url = require('url');

const port = 8090

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    console.log(pathname)
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found')
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(port);