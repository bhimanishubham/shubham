let crypto = require('crypto')
let utils = require('../../utils/utils')
let Course = require('mongoose').model('course')
require('../../utils/success_code')
require('../../utils/error_code')

exports.add_course = async function (req, res) {
    try {
        let params_array = [{name:"name",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let add_course = new Course({
                name:req.body.name,
                description:req.body.description,
                student_no:req.body.student_no,
        })
        let id = (add_course._id).toString()
        if(req.files && req.files.length >0){
            let imagename = id + utils.tokenGenerator(4) + '.jpg'
            let url = utils.get_folder_id(1) + imagename 
            utils.save_folder_image(req.files[0].path,imagename,"1")
            add_course.image = url
        }
        await add_course.save()
        res.json({success:true,message:COURSE_MESSAGE_CODE.ADD_SUCCESSFULLY})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.update_course = async function (req, res) {
    try {
        let params_array = [{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let id =req.body.id
        let course = await Course.findById(id)
        if(req.files && req.files.length >0){
            utils.delete_folder_image(course.image)
            let imagename = course.id + utils.tokenGenerator(4) + '.jpg'
            let url = utils.get_folder_id(1) + imagename 
            utils.save_folder_image(req.files[0].path,imagename,"1")
            req.body.image = url
        }
        await Course.findByIdAndUpdate(id,req.body)
        res.json({success:true,message:COURSE_MESSAGE_CODE.UPDATE_SUCCESSFULLY})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.delete_course = async function (req, res) {
    try {
        let params_array = [{name:"id",type:"string"}]
        let id =req.body.id
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let course =  await Course.findByIdAndDelete(id)
        utils.delete_folder_image(course.image)
        res.json({success:true,message:COURSE_MESSAGE_CODE.DELETE_SUCCESSFULLY})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.course_list = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let course_list = await Course.find({}).sort({createdAt : -1})
        res.json({success:true,course_list:course_list})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.get_all_course = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let course_list = await Course.find({}).sort({createdAt : -1})
        res.json({success:true,course_list:course_list})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}


exports.get_course = async function (req, res) {
    try {
        let params_array = [{name:"id",type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let course = await Course.findById({_id : req.body.id})
        res.json({success:true,course:course})
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}