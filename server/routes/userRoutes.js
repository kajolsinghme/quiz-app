const express = require('express')
const router = express.Router()
const {start_quiz}= require('../controllers/UserController');

router.post('/quiz/start',start_quiz)

module.exports = router;