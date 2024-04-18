var express = require('express');
const animal_controllers= require('../controllers/animal');
var router = express.Router();
var passport = require('passport');

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
   }

router.post('/login', passport.authenticate('local'), function(req, res) {
  if(req.session.returnTo)
    res.redirect(req.session.returnTo);  
  res.redirect('/');
});

/* GET animals page. */
router.get('/', animal_controllers.animal_view_all_Page);

/* GET detail animal page */
router.get('/detail', animal_controllers.animal_view_one_Page);

/* GET create animal page */
router.get('/create', secured, animal_controllers.animal_create_Page);

/* GET create update page */
router.get('/update', secured, animal_controllers.animal_update_Page);

/* GET delete animal page */
router.get('/delete', secured, animal_controllers.animal_delete_Page);

module.exports = router;
