const mongoose = require("mongoose")
const PenSchema = mongoose.Schema({
    
    Pen_color:{
        type:String,
        minLength:3
    },
    Pen_Company: String,
    Pen_cost:{
        type: Number,
    min:0,
    max: 1000,
   }, 
});
module.exports = mongoose.model("Pen",PenSchema)