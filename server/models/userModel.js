const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)