let router = require('express').Router()
let user_route = require('../user/routes/user')
let user_course_route = require('../user/routes/user_course')

router.use('',user_route)
router.use('',user_course_route)

module.exports = router