const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/connection')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes')
const userAttemptRoutes = require('./routes/userAttemptRoutes')

const port = process.env.PORT
const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/quiz',questionRoutes);
app.use('/api/v1/user',userAttemptRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});
