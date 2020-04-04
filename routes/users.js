const express = require('express');
const router = express.Router();
const userControll = require('../controller/userControll')
const resHandler = require('../api/common/resHandler')

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

// 登录
router.post('/signin', (req, res) => {
  resHandler(req, res);
  // var random = csprng(160, 36);
  userControll.signin(req,res)
});
     
// 注册
router.post('/signup', (req, res) => {
  resHandler(req, res);
  userControll.signup(req, res)
});

router.options('/info', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

// 用户信息
router.get('/info', (req, res) => {
  resHandler(req, res);
  userControll.info(req, res)
})

module.exports = router;