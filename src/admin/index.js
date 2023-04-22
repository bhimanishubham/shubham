let router = require('express').Router()
let admin_route = require('../admin/routes/admin')
let course_route = require('../admin/routes/course')
let user_route = require('../admin/routes/user')

router.use('',admin_route)
router.use('',course_route)
router.use('',user_route)

module.exports = router