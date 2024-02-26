const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);

//=====================================
// Build schema
const childSchema = new mongoose.Schema({
    _id:Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    age: {
        type: Number,
        required: true
    },
    role:String,
    image:String,
    level: {
        type: String,
        require: true,
        enum: ["preKG", "KG1", "KG2"]
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        building: {
            type: String,
            required: true
        }
       },
teacherId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"teachers"
}
});
//=====================================


//=====================================
// Add auto-increment to the schema
childSchema.plugin(mongooseSequence, { inc_field: '_id' });
//=====================================


//table in db
module.exports = mongoose.model("Child", childSchema);
