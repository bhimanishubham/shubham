let admin = require('../controller/admin')
let router = require('express').Router()

router.post('/login',admin.login)
router.post('/add_admin',admin.add_admin)
router.post('/update_admin',admin.update_admin)
router.post('/delete_admin',admin.delete_admin)
router.post('/get_admin',admin.get_admin)

router.get('/get_all_admin',admin.get_all_admin)
router.get('/get_all_user',admin.get_all_user)

module.exports = router