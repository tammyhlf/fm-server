/**
 * 登录的session配置  废弃，暂改为基于token验证的登录方法
 */

const session = require('express-session')

const sessionLogin = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 },
  expires: 1 * 24 * 60 * 60
});

module.exports = {
  sessionLogin
}