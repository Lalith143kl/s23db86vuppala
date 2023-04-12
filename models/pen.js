const mongoose = require("mongoose")
const PenSchema = mongoose.Schema({
    Pen_color: String,
    Pen_Company: String,
    Pen_cost: Number
})
module.exports = mongoose.model("Pen",PenSchema)