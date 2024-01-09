const express = require('express')
const router = express.Router()
const {getQuizQuestion,addQuizQuestion} = require('../controllers/QuizQuestionController')

router.get('/questions',getQuizQuestion)
router.post('/questions',addQuizQuestion)

module.exports = router;