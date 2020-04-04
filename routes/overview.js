const express = require('express');
const router = express.Router();
const resHandler = require('../api/common/resHandler')
const jwt = require("jsonwebtoken");
const overviewControll = require('../controller/overviewController')

router.options('/', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/', (req, res) => {
  resHandler(req, res);
  const token = req.headers.token;
  jwt.verify(token, "secret", (err) => {
    if(err) {
      // res.send({ code: 4001, msg: 'token认证错误'});
      res.status(401).json(err)
    } else {
      overviewControll.overview(req, res);
    }
  })
  
})

module.exports = router;