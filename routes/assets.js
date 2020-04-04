const express = require('express');
const router = express.Router();
const assetsControll = require('../controller/assetsController')
const resHandler = require('../api/common/resHandler')

router.options('/', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/', (req, res) => {
  resHandler(req, res);
  assetsControll.info(req, res)
});

router.options('/total', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/total', (req, res) => {
  resHandler(req, res);
  assetsControll.total(req, res)
});

router.options('/add', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/add', (req, res) => {
  resHandler(req, res);
  assetsControll.add(req, res)
});

router.options('/delete', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/delete', (req, res) => {
  resHandler(req, res);
  assetsControll.deleteInfo(req, res)
});

module.exports = router;