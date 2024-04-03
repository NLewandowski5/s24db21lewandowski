var Animal = require('../models/animals');
// List of all Animals
exports.animal_list = function(req, res) {
res.send('NOT IMPLEMENTED: Animal list');
};
// for a specific Animal.
exports.animal_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Animal detail: ' + req.params.id);
};
// Handle Animal create on POST.
exports.animal_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Animal create POST');
};
// Handle Animal delete from on DELETE.
exports.animal_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Animal delete DELETE ' + req.params.id);
};
// Handle Animal update form on PUT.
exports.animal_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Animal update PUT' + req.params.id);
};
