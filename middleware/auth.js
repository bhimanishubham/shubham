let jwt = require('jsonwebtoken')
let Admin = require('mongoose').model('admin')
require('../src/utils/error_code')

exports.auth_guard = async function (req,res){
    let headers =  req.headers.authorization.split(' ')[1]
    let decode = jwt.decode(headers)
    let admin = await Admin.findOne({_id:decode._id , token:decode.token})
    if(!admin){
        res.json({success:false,error_code:ERROR_CODE.INVALID_SERVER_TOKEN})
        return
    }
    req.admin = admin
    next();
}