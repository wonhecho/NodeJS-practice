const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var count = 0;

if(cluster.isMaster){
  console.log(`process id : ${process.pid}`);
  for(let i=0; i< numCPUs; i+=1)
  {
    cluster.fork();
  }
  cluster.on('exit',(worker,code,signal)=>{
    console.log(`${worker.process.pid} shut down`);
    console.log('code',code, 'signal',signal);
  });
} else{
  http.createServer((req,res)=>{
    res.writeHead(200, {'content-Type':'text/html; charste=utf-8'});
    res.write(`<h1 refresh count ${count} </h1>`);
    res.end('<p> Hello Cluster!</p>');
    setTimeout(()=>{
      process.exit(1);      
    },1000);
  }).listen(8086);
  console.log(`${process.pid} worker start`);
}