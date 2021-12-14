const http = require('http');

http.createServer((req,res)=>{
  console.log(req.url, req.headers.cookie);
  res.writeHead(200,{'Set-Cookie':'mycookie=test'});    // 쿠키가 전달되는 부분 mycookie=test라는 쿠키를 저장한다.
  res.end('Hello Cookie');
})
.listen(8083,()=>{
  console.log('8083 port opening');
})

//
favicon은 웹 사이트 탬에 보이는 이미지를 뜻한다. HTML에서 유추할 수 없으면 서버에 파비콘 정보에 대한 요청을 보낸다.
