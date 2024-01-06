const mongoose = require('mongoose');

const userAttemptSchema = new mongoose.Schema({
    attemptedId: { 
        type: String, 
        required: true 
    },
    attemptedQuesSoFar: { 
        type: Number, 
        required: true ,
        default:0
    },
    obtainedScoreSoFar:{
        type: Number, 
        required: true,
        default: 0
    },
    settled: { 
        type: Boolean, 
        required: true 
    },
    attemptedBy: { 
        type: String, 
        required: true 
    },
    lastAction: { 
        type: String,           //exited by user, quiz completed, null
        default: null
    }
})

module.exports = mongoose.model('UserAttempt',userAttemptSchema)