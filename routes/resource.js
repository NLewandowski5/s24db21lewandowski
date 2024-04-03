var express = require('express');
var router = express.Router();
// Require controller modules.

var animal_controller = require('../controllers/animal');
var api_controller = require('../controllers/api');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// COSTUME ROUTES ///
// POST request for creating a Animal.
router.post('/animals', animal_controller.animal_create_post);
// DELETE request to delete Animal.
router.delete('/animals/:id', animal_controller.animal_delete);
// PUT request to update Animal.
router.put('/animals/:id', animal_controller.animal_update_put);
// GET request for one Animal.
router.get('/animals/:id', animal_controller.animal_detail);
// GET request for list of all Animal items.
router.get('/animals', animal_controller.animal_list);
module.exports = router;

