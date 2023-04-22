let router = require('express').Router()
let course = require('../controller/course')

router.post("/add_course",course.add_course)
router.post('/update_course',course.update_course)
router.post('/delete_course',course.delete_course)
router.post('/course_list',course.course_list)
router.post('/get_course',course.get_course)

router.get('/get_all_course',course.get_all_course)
module.exports = router