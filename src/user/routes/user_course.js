let router = require('express').Router()
let user_course = require('../controller/user_course')

router.post('/purchase_course',user_course.purchase_course)
router.post('/get_course_details',user_course.get_course_details)
router.post('/check_course_purchase',user_course.check_course_purchase)

module.exports = router