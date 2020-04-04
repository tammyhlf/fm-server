const express = require('express')
const router = express.Router()
const starControll = require('../controller/starController')
const resHandler = require('../api/common/resHandler')

router.options('/', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/', (req, res) => {
  resHandler(req, res);
  starControll.saveStar(req, res)
})

router.options('/star', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/star', (req, res) => {
  resHandler(req, res);
  starControll.getStar(req, res)
})

router.options('/update', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/update', (req, res) => {
  resHandler(req, res);
  starControll.updateStar(req, res)
})

module.exports = router