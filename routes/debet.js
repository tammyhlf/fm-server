const express = require('express');
const router = express.Router();
const debetControll = require('../controller/debetController')
const resHandler = require('../api/common/resHandler')

router.options('/', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/', (req, res) => {
  resHandler(req, res);
  debetControll.info(req, res)
});

router.options('/total', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/total', (req, res) => {
  resHandler(req, res);
  debetControll.total(req, res)
});

router.options('/add', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/add', (req, res) => {
  resHandler(req, res);
  debetControll.add(req, res)
});

router.options('/delete', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/delete', (req, res) => {
  resHandler(req, res);
  debetControll.deleteInfo(req, res)
});

module.exports = router;