var pen = require('../models/pen');
// List of all pens
exports.pen_list = async function (req, res) {
    try {
        thepen = await pen.find();
        res.send(thepen);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
    //res.send('NOT IMPLEMENTED: pen list');
};
//for a specific pen.
exports.pen_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await pen.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle pen create on POST.

//res.send('NOT IMPLEMENTED: pen create POST');
// Handle pen create on POST.
exports.pen_create_post = async function (req, res) {
    console.log(req.body)
    let document = new pen();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"pen_type":"goat", "cost":12, "size":"large"}
    document.Pen_color = req.body.Pen_color;
    document.Pen_Company = req.body.Pen_Company;
    document.Pen_cost = req.body.Pen_cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle pen delete form on DELETE.
// Handle pen delete on DELETE.
exports.pen_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await pen.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
// Handle pen update form on PUT.
exports.pen_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await pen.findById(req.params.id)
        // Do updates of properties
        if (req.body.Pen_color)
            toUpdate.Pen_color = req.body.Pen_color;
        if (req.body.Pen_Company) toUpdate.Pen_Company = req.body.Pen_Company;
        if (req.body.Pen_cost) toUpdate.Pen_cost = req.body.Pen_cost;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};

// VIEWS
// Handle a show all view
exports.pen_view_all_Page = async function (req, res) {
    try {
        thepens = await pen.find();
        res.render('pen', { title: 'pen Search Results', results: thepens });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.pen_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await pen.findById( req.query.id)
    res.render('pendetail',
   { title: 'pen Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   
   // Handle building the view for creating a pen.
// No body, no in path parameter, no query.
// Does not need to be async
exports.pen_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('pencreate', { title: 'pen Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }

};

// Handle building the view for updating a pen.
// query provides the id
exports.pen_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await pen.findById(req.query.id)
    res.render('penupdate', { title: 'pen Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle a delete one view with id from query
exports.pen_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await pen.findById(req.query.id)
    res.render('pendelete', { title: 'pen Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };