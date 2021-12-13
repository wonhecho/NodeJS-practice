const http = require('http');

http.createServer((req,res)=>{
  res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
.listen(8080, () =>{
  console.log('8080 port opening');
})