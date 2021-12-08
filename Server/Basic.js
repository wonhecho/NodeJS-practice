const http = require('http');

http.createServer((req,res) => {
  res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Node JS </h1>');
  })
  .listen(8080,() => {
    console.log('Server start');
  });
