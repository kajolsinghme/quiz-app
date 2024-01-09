const express = require('express')
const router = express.Router()
const {getUserAttemptByUsername} = require('../controllers/UserAttemptController')

router.get('/attempt/get',getUserAttemptByUsername)

module.exports = router