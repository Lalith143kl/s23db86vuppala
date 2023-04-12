var pen = require('../models/pen');
// List of all pens
exports.pen_list = async function(req, res) {
    try{
        thepen = await pen.find();
        res.send(thepen);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
//res.send('NOT IMPLEMENTED: pen list');
};
// for a specific pen.
exports.pen_detail = function(req, res) {
res.send('NOT IMPLEMENTED: pen detail: ' + req.params.id);
};
// Handle pen create on POST.

//res.send('NOT IMPLEMENTED: pen create POST');
// Handle pen create on POST.
exports.pen_create_post = async function(req, res) {
    console.log(req.body)
    let document = new pen();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"pen_type":"goat", "cost":12, "size":"large"}
    document.Pen_color = req.body.Pen_color;
    document.Pen_Company = req.body.Pen_Company;
    document.Pen_cost = req.body.Pen_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// Handle pen delete form on DELETE.
exports.pen_delete = function(req, res) {
res.send('NOT IMPLEMENTED: pen delete DELETE ' + req.params.id);
};
// Handle pen update form on PUT.
exports.pen_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: pen update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.pen_view_all_Page = async function(req, res) {
    try{
    thepens = await pen.find();
    res.render('pen', { title: 'pen Search Results', results: thepens });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


