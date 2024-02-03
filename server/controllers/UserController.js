const User = require('../models/userModel');
const UserAttempt= require('../models/userattemptModel');

exports.start_quiz = async (req, res) => {
    const { username } = req.body;
    try { 
        if (!username) {
            return res.status(400).json({ error: 'Username is required to start the quiz.' });
        }
        let existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            const newUser = new User({
                username: req.body.username
            });
            existingUser = await newUser.save();
        }

        const userAttempt = new UserAttempt({
            attemptedBy: existingUser._id
        });

        await userAttempt.save();

        return res.status(201).json({ message: `Hi ${req.body.username}! Starting the quiz...` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
        


