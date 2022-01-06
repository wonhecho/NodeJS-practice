const http = require('http');

http.createServer((req,res) => {
  res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});      //기초 서버 만드는 부분
  res.write('<h1>Node JS </h1>');
  })
  .listen(8080,() => {
    console.log('Server start');
  });
