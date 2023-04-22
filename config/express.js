let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let cors = require('cors')
let multer = require('multer')
module.exports = () => {
    app.use(express.static('./uploads/'))
    app.use(multer({dest:__dirname+'/uploads/'}).any())
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: true }))
    app.use(cors())
    app.use('',require('../src/index'))
    return app
}