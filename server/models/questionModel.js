const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionId:{
        type: String,
        required: true
    },
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
})

module.exports = mongoose.model('Question',questionSchema)