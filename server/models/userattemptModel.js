const mongoose = require('mongoose');

const userAttemptSchema = new mongoose.Schema({
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
        default:false
    },
    attemptedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true 
    },
    lastAction: { 
        type: String, 
        enum: ["exited by user", "quiz completed", null],       
        default: null
    }    
},
{
    timestamps:true
}
)

module.exports = mongoose.model('UserAttempt',userAttemptSchema)