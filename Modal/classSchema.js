const mongoose=require("mongoose");
const mongooseSequence = require('mongoose-sequence')(mongoose);

const classSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers" 
    },
    children: [{
        type: Number 
    }]
});

//classSchema.plugin(mongooseSequence, { inc_field: '_id' });
module.exports=mongoose.model("class",classSchema);