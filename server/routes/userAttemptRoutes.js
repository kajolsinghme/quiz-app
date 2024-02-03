const express = require('express')
const router = express.Router()
const {getUserAttemptByUsername,updateUserAttempt, getUserAttemptById} = require('../controllers/UserAttemptController')

router.get('/attempt/get',getUserAttemptByUsername)
router.get('/attempt/get/:userAttemptId',getUserAttemptById)
router.put('/attempt/update/:userAttemptId',updateUserAttempt)

module.exports = router