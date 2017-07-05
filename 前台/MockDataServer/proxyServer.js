/*
* node代理服务器
* */
var express = require('express');
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

// var httpProxy = require('http-proxy');
// var proxy = httpProxy.createProxyServer({target: "http://10.10.20.155:8080/"});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置允许跨域
app.all('*', function(req, res) {

  res.header({
    'Access-Control-Max-Age' : '60',
    'Access-Control-Allow-Origin'  : '*',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Methods' : 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  var type = "get";
  var form = req.body || null;
  if (form) type = "post";

  request[type]({
    encoding:'utf8',
    form: form,
    url: "http://10.10.20.155:8080" + req.originalUrl,
    headers: { 'X-Requested-With' : 'XMLHttpRequest' }
  }, function (error, response, body) {
    if(error) {
      res.send(error);

    }else {

      if(body.indexOf("<html><head><title>") === -1) {
        res.json(JSON.parse(body));

      }else {
        res.json("options");
      }
    }

  })
});

app.listen(8888, function () {
  console.log("MockDataServer on 8888");
});


