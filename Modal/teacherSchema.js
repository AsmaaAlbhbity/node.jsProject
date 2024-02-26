const mongoose = require("mongoose");
const mongooseSequence = require('mongoose-sequence')(mongoose);


//=====================================
// Build schema
const teacherSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
        //minlength: 6
    },
    Email:{
        type:String,
        unique:true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'teacher'] 
        
    },
    image:String
});
//=====================================

//=====================================
// auto-Inc ID
//teacherSchema.plugin(mongooseSequence, { inc_field: '_id' });
//=====================================

module.exports = mongoose.model("Teacher", teacherSchema);
