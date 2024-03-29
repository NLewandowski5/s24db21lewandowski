var express = require('express');
var router = express.Router();

/* GET animals page. */
router.get('/', function(req, res, next) {
  res.render('animals', { title: 'Search Results - Animals' });
});

module.exports = router;
