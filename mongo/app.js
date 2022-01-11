const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const connect = require('./schemas');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views',{
  express: app,
  watch: true,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));   //public 확인
app.use(express.json());                                  //join
app.use(express.urlencoded({ extended: false}));          //unlencoded

app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/comments',commentsRouter);

app.use((req,res,next)=>{
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);     //라우터 확인.
  error.status = 404;
  next(error);
});
app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'),()=>{
  console.log(app.get('port'), '번 포트에서 대기중'); //waiting
})
