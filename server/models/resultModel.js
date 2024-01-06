const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    resultId:{
        type: String,
        required: true
    },
    userattemptId:{
        type: String,
        required: true
    },
    maxQuizScore:{
        type: Number, 
        default:100
    },
    attemptedBy:{
        type: String, 
        required: true
    },
    maxQues:{
        type: Number,
        default:10
    },
    attemptedQues:{ 
        type: Number, 
        required: true 
    },
    obtainedQuizScore:{
        type: Number, 
        required: true 
    }
})

module.exports = mongoose.model('Result',resultSchema)