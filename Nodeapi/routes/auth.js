const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req,res, next)=>{
  const {email, nick, password} = req.body;
  try{
    const exUser = await User.findOne({ where: {email} });
    if(exUser){
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error){
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req,res,next) => {
  passport.authenticate('local', (authError, user, info) => {   // 두번째 인수로 {session : false}를 이용하면 세션을 사용하지 않고 JWT로 로그인이 가능.
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req,res,next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao',{
  failureRedirect: '/',
}),(req, res) => {
  res.redirect('/');
});

module.exports = router;
