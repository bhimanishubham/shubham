let crypto = require('crypto')
let jsonwebtoken = require('jsonwebtoken')
let utils = require('../../utils/utils')
let Admin = require('mongoose').model('admin')
let User = require('mongoose').model('user')
require('../../utils/success_code')
require('../../utils/error_code')
/* ADMIN LOGIN */
exports.login = async function (req, res) {
    try {
        let params_array = [{name:"email",type:"string"},{name:"password",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        let password = req.body.password
        let email = req.body.email
        //  if there is no admin in db then default entry for admin
        let admin_list = await Admin.findOne({})
        if (admin_list === null) {
            let hash = crypto.createHash('md5').update("123456").digest('hex');
            let defaultAdmin = new Admin({
                username: "admin",
                email: "admin@gmail.com",
                password: hash,
                main:true, 
            });
            await defaultAdmin.save();
            message = ADMIN_MESSAGE_CODE.LOGIN_SUCCESSFULLY;
            res.json({ success: true, message: message, is_default: true })
            return
        }
        // find admin
        let hash = crypto.createHash('md5').update(password).digest('hex');
        // let admin = await Admin.findOne({ $and: [{ email: email },{password:hash},{ username: username }] })
        let admin = await Admin.findOne({ email: email })
        if (!admin) {
            error_code = ADMIN_ERROR_CODE.INVALID_USERNAME
            res.json({ success: false, error_code: error_code })
            return
        }
        if (admin.password != hash) {
            error_code = ADMIN_ERROR_CODE.INVALID_PASSWORD;
            res.json({ success: false, error_code: error_code })
            return
        }
        admin.token = utils.tokenGenerator(32)
        admin.jwt = jsonwebtoken.sign({_id:admin._id,token:admin.token},"secret_here_123")
        await admin.save()
        message = ADMIN_MESSAGE_CODE.LOGIN_SUCCESSFULLY;
        res.json({ success: true, message: message, adminDetail: admin })
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.add_admin = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)    
            return;
        }
        // code 
        let username = req.body.username
        let email = req.body.email
        let phone =  req.body.phone
        let duplicate_admin = await Admin.findOne({$or :[{email:email},{username:username},{phone : phone}]})
        if(duplicate_admin){
            error_code = ADMIN_ERROR_CODE.EMAIL_ALREADY_REGISTERED
            res.json({success:false,error_code:error_code})
            return
        }
        if(password){
            req.body.password = crypto.createHash('md5').update(password).digest('hex');
        }
        let new_admin = new Admin({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role_type: req.body.role_type,
            url_array:req.body.url_array,
            phone:req.body.phone,
        })
        await new_admin.save()
        res.json({success:true,message_code:ADMIN_MESSAGE_CODE.ADD_SUCCESSFULLY})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.get_admin = async function (req, res) {
    try {
        let params_array = [{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let admin = await Admin.findById({_id : req.body.id})
        res.json({success:true,message_code:ADMIN_MESSAGE_CODE.ADD_SUCCESSFULLY , admin})
    } catch (error) {
        utils.error_response(error, res)
    }
}


exports.update_admin = async function (req,res){
    try {
        let params_array = [{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let username = req.body.username
        let email = req.body.email
        let phone =  req.body.phone
        let duplicate_admin = await Admin.findOne({$or :[{email:email},{username:username},{phone : phone}]})
        if(duplicate_admin && duplicate_admin._id != req.body.id){
            error_code = ADMIN_ERROR_CODE.EMAIL_ALREADY_REGISTERED
            res.json({success:false,error_code:error_code})
            return
        }
        let id = req.body.id
        let password = req.body.password
        if(password){
            req.body.password = crypto.createHash('md5').update(password).digest('hex');
        }
        let update = await Admin.findByIdAndUpdate(id,req.body,{new : true})
        if(!update){
            error_code = ADMIN_ERROR_CODE.UPDATE_FAILED
            res.json({success:false,error_code:error_code})
            return
        }
        message = ADMIN_MESSAGE_CODE.UPDATE_SUCCESSFULLY
        res.json({success:true,message:message,update})
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.delete_admin = async function (req, res) {
    try {
        let params_array = [{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let id = req.body.id
        let delete_admin = await Admin.findByIdAndDelete({_id :id})
        if(!delete_admin){
            res.json({success:false,error_code:ADMIN_ERROR_CODE.DELETE_FAILED})
            return
        }
        res.json({success:true,message:ADMIN_MESSAGE_CODE.DELETE_SUCCESSFULLY})
        return
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.get_all_admin = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let admin = await Admin.find({}).sort({createdAt : -1})
        res.json({success:true,message_code:ADMIN_MESSAGE_CODE.ADD_SUCCESSFULLY , admin})
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.get_all_user = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let user = await User.find({}).sort({createdAt : -1})
        res.json({success:true,message_code:ADMIN_MESSAGE_CODE.ADD_SUCCESSFULLY , user})
    } catch (error) {
        utils.error_response(error, res)
    }
}
