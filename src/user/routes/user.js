let router = require("express").Router() 
let user = require('../controller/user')
let course = require('../../admin/controller/course')

router.post('/user_register',user.user_register)
router.post('/check_referred',user.check_referred)
router.post('/user_login',user.user_login)
router.post('/update_user',user.update_user)
router.post('/delete_user',user.delete_user)
router.post('/get_user',user.get_user)
router.get('/get_all_course',course.get_all_course)

router.post('/forgot_password',user.forgot_password)


module.exports = router