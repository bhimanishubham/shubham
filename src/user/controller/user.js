let crypto = require('crypto')
let jsonwebtoken = require('jsonwebtoken')
let utils = require('../../utils/utils')
let User = require('mongoose').model('user')
require('../../utils/success_code')
require('../../utils/error_code')

exports.user_register = async (req,res) => {
    try {
        let params_array = [{name:'name',type:"string"},{name:"email",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let duplicate_user = await User.findOne({$or:[{email:req.body.email,phone:req.body.phone}]})
        if(duplicate_user){
            res.json({success:false,error_code:USER_ERROR_CODE.ALREADY_EXITS})
            return
        }
        req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
        req.body.referral_code =utils.tokenGenerator(5)
        let add_user = new User(req.body)
        let id = (add_user._id).toString()
        if(req.files && req.files.length >0){
            let imagename = id + utils.tokenGenerator(4) + '.jpg'
            let url = utils.get_folder_id(2) + imagename 
            utils.save_folder_image(req.files[0].path,imagename,2)
            add_user.image = url
        }
        let user = await add_user.save()
        res.json({success:true,message:USER_MESSAGE_CODE.ADD_SUCCESSFULLY,user})
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.check_referred = async (req,res) => {
    try {
        let params_array = [{name:'referral_code',type:"string"},{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let refcode_user = await User.findOne({referral_code:req.body.referral_code})
        if(!refcode_user){
            res.json({success:false,error_code:ERROR_CODE.INVALID_REFERRAL_CODE})
            return
        }
        await User.findByIdAndUpdate(req.body.id,{referred_by:refcode_user._id})
        res.json({success:true,message:USER_MESSAGE_CODE.REFERRED_SUCCESSFULLY})
        return
    } catch (error) {
        utils.error_response(error,res)
    }
}

exports.user_login = async function (req, res) {
    try {
        let params_array = [{name:"email",type:"string"},{name:"password",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        let password = req.body.password
        let email = req.body.email       
        // find admin
        let hash = crypto.createHash('md5').update(password).digest('hex');
        let user = await User.findOne({ email: email,password: hash })
        if (!user) {
            error_code = USER_ERROR_CODE.DETAIL_NOT_FOUND
            res.json({ success: false, error_code: error_code })
            return
        }
        user.token = utils.tokenGenerator(32)
        user.jwt = jsonwebtoken.sign({_id:user._id,token:user.token},"secret_here_123")
        await user.save()
        message = USER_MESSAGE_CODE.LOGIN_SUCCESSFULLY;
        res.json({ success: true, message: message,user })
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.update_user = async (req,res) => {
    try {
        let params_array = [{name:'id',type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let duplicate_user = await User.findOne({_id:{$ne:req.body.id},$or:[{email:req.body.email},{phone:req.body.phone}]})
        if(duplicate_user){
            res.json({success:false,error_code:USER_ERROR_CODE.ALREADY_EXITS})
            return
        }
        if(req.body.password){
            req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
        }
        let id = req.body.id
        if(req.files && req.files.length >0){
            let imagename = id + utils.tokenGenerator(4) + '.jpg'
            let url = utils.get_folder_id(1) + imagename 
            utils.save_folder_image(req.files[0].path,imagename,"1")
            req.body.image = url
        }
        await User.findByIdAndUpdate(id,req.body)
        res.json({success:true,message:USER_MESSAGE_CODE.ADD_SUCCESSFULLY})
        return
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.delete_user = async (req,res) => {
    try {
        let params_array = [{name:'id',type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        await User.findByIdAndDelete(req.body.id)
        res.json({success:true,message:USER_MESSAGE_CODE.DELETE_SUCCESSFULLY})
        return
    } catch (error) {
        utils.error_response(error, res)
    }
}


exports.get_user = async (req,res) => {
    try {
        let params_array = [{name:'id',type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let user = await User.findById({_id :req.body.id})
        res.json({success:true,user : user})
        return
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.forgot_password = async (req,res) => {
    try {
        let params_array = [{name:'user_id',type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let user = await User.findById({_id :req.body.user_id})
        let new_passowrd = utils.tokenGenerator(6)
        user.password = crypto.createHash('md5').update(new_passowrd).digest('hex')
        utils.send_mail(user.email,new_passowrd)
        await user.save()
        message = USER_MESSAGE_CODE.SEND_PASSWORD_SUCCESSFULLY        
        res.json({success:true,message})
        return
    } catch (error) {
        utils.error_response(error, res)
    }
}