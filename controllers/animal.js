var Animal = require('../models/animals');
// List of all Animals
exports.animal_list = async function(req, res) {
    try{
    theAnimals = await Animal.find();
    res.send(theAnimals);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    }; 

// for a specific Animal.
exports.animal_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Animal.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
        
// Handle Animal create on POST.
exports.animal_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Animal();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.species = req.body.species;
    document.habitat = req.body.habitat;
    document.population = req.body.population;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// Handle Animal delete from on DELETE.
exports.animal_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Animal.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

// Handle Animal update form on PUT.
exports.animal_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await Animal.findById( req.params.id)
    // Do updates of properties
    if(req.body.species) toUpdate.species = req.body.species;
    if(req.body.habitat) toUpdate.habitat = req.body.habitat;
    if(req.body.population) toUpdate.population = req.body.population;

    if(req.body.checkboxsale) toUpdate.sale = true;
    else toUpdate.same = false;

    let result = await toUpdate.save();
    console.log("Success " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
    };

// VIEWS
// Handle a show all view
exports.animal_view_all_Page = async function(req, res) {
    try{
    theAnimals = await Animal.find();
    res.render('animals', { title: 'Animal Search Results', results: theAnimals });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// Handle a show one view with id specified by query
exports.animal_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Animal.findById( req.query.id)
    res.render('animaldetail',
    { title: 'Animal Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle building the view for creating an animal.
// No body, no in path parameter, no query.
// Does not need to be async
exports.animal_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('animalcreate', { title: 'Animal Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle building the view for updating an animal.
// query provides the id
exports.animal_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Animal.findById(req.query.id)
    res.render('animalupdate', { title: 'Animal Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   
// Handle a delete one view with id from query
exports.animal_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Animal.findById(req.query.id)
    res.render('animaldelete', { title: 'Animal Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };