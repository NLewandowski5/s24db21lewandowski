var express = require('express');
const animal_controllers= require('../controllers/animal');
var router = express.Router();

/* GET animals page. */
router.get('/', animal_controllers.animal_view_all_Page);

/* GET detail animal page */
router.get('/detail', animal_controllers.animal_view_one_Page);

module.exports = router;
