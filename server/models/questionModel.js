const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    desc:{
        type:String,
        required: true
    },
    options:{
        type:[String],
        required:true
    },
    correctAnswer:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Question',questionSchema)