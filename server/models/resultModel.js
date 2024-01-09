const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    attemptedId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAttempt',
        required:true
    },
    maxQuizScore:{
        type: Number, 
        default:100
    },
    maxQues:{
        type: Number,
        default:10
    },
    attemptedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    attemptedQues:{ 
        type: Number, 
        required: true 
    },
    obtainedQuizScore:{
        type: Number, 
        required: true 
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Result',resultSchema)