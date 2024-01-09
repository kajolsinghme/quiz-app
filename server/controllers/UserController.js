const User = require('../models/userModel');
const UserAttempt= require('../models/userattemptModel');

exports.start_quiz = async (req, res) => {
    try { 
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            const userAttempt = new UserAttempt({
                attemptedBy:existingUser._id
            })
            await userAttempt.save()
            return res.status(200).json({ message: 'User already exists. Starting the quiz...'});
        }
        else{
            const newUser = new User({
                username: req.body.username
            });
            await newUser.save();
            const userAttempt = new UserAttempt({
                attemptedBy:newUser._id
            })
            await userAttempt.save();
            return res.status(201).json({ message: 'User registered successfully. Starting the quiz...' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


