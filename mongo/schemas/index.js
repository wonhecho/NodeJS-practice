const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
  }
  mongoose.connect('mongodb://cho:root@127.0.0.1:27017/admin',{
    dbName: 'nodejs', 
    useNewUrlParser: true,
    // useCreateIndex: true,                                    mongoose 6버전부터 지원하지 않음
  }, (error) =>{
    if (error) {
      console.log('mongo connect error',error);
    }else{
      console.log('mongo connect');
    }
  });
};
mongoose.connection.on('error', (error)=>{
  console.error('mongo connect error',error);
});
mongoose.connection.on('disconnected', ()=>{
  console.error('mongo disconnected, retry connect');
  connect();
});
mongoose.connection.once('open', () => {
  console.log("connect");
});
module.exports = connect;
