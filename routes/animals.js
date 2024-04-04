var express = require('express');
const animal_controllers= require('../controllers/animal');
var router = express.Router();

/* GET animals page. */
router.get('/', animal_controllers.animal_view_all_Page);

module.exports = router;
