const express = require('express');
const router = express.Router();
const bookControll = require('../controller/bookController')
const resHandler = require('../api/common/resHandler')

router.options('/', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/', (req, res) => {
  resHandler(req, res);
  bookControll.book(req, res)
});

router.options('/info', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.get('/info', (req, res) => {
  resHandler(req, res);
  bookControll.bookInfo(req, res)
});

router.options('/delete', (req, res) => {
  resHandler(req, res);
  return res.json({});   //直接返回空数据，结束此次请求
});

router.post('/delete', (req, res) => {
  resHandler(req, res);
  bookControll.deleteInfo(req, res)
});

module.exports = router;