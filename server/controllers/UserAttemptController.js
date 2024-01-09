const UserAttempt = require('../models/userattemptModel')
const User = require('../models/userModel');

exports.getUserAttemptByUsername = async(req,res) => {
    try{
        const username = req.query.username
        const user = await User.findOne({username:username})
        const userAttempt = await UserAttempt.find({attemptedBy:user._id})
        return res.json(userAttempt)
    }
    catch(error){
        res.status(500).json({ error: error})
    }
}