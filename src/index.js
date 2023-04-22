let router = require('express').Router()

router.use('/admin',require('../src/admin/index'))
router.use('/user',require('../src/user/index'))

module.exports = router