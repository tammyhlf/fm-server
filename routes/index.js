var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const session = req.session.id
  res.render({ session });
});

module.exports = router;
