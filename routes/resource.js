var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var pen_controller = require('../controllers/pen');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// pen ROUTES ///
// POST request for creating a pen.
router.post('/pens', pen_controller.pen_create_post);
// DELETE request to delete pen.
router.delete('/pens/:id', pen_controller.pen_delete);
// PUT request to update pen.
router.put('/pens/:id', pen_controller.pen_update_put);
// GET request for one pen.
router.get('/pens/:id', pen_controller.pen_detail);
// GET request for list of all pen items.
router.get('/pens', pen_controller.pen_list);
module.exports = router;

