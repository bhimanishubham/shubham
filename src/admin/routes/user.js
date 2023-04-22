let router = require('express').Router()
let user = require('../controller/user')
let users = require('../../user/controller/user')

router.post('/add_user',users.user_register)
router.post('/check_referred',users.check_referred)
router.post('/user_login',users.user_login)
router.post('/update_user',users.update_user)
router.post('/delete_user',users.delete_user)
router.post('/get_user',users.get_user)

router.post('/user_referral_list',user.referral_list)

router.post('/user_referral',user.referral)

router.post('/user_course_list',user.user_course_list)


module.exports = router