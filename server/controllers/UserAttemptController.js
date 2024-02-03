const UserAttempt = require('../models/userattemptModel')
const User = require('../models/userModel');

exports.getUserAttemptById = async(req,res) =>{
    try{
        const userAttemptId = req.params.userAttemptId;
        const userAttempt = await UserAttempt.findById(userAttemptId)
        res.json(userAttempt)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:error.message})
    }
}

exports.getUserAttemptByUsername = async(req,res) => {
    try{
        const username = req.query.username
        const user = await User.findOne({username:username})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const latestUserAttempt = await UserAttempt.findOne({attemptedBy: user._id}).sort({createdAt:-1})
        if(latestUserAttempt){
            return res.json(latestUserAttempt)
        }
        else {
            return res.json([]);
        }
    }
    catch(error){
        res.status(500).json({ error: error})
    }
}

exports.updateUserAttempt = async (req, res) => {
    try {
        const userAttemptId = req.params.userAttemptId;
        const updatedData = req.body;
        await UserAttempt.findByIdAndUpdate(userAttemptId, updatedData);
        res.status(200).json({ message: 'User attempt updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
