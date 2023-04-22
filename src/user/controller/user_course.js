const { default: mongoose } = require('mongoose')
let utils = require('../../utils/utils')
let User = require('mongoose').model('user')
let Course = require('mongoose').model('course')
let User_course = require("mongoose").model("user_course")
let objectid = mongoose.Types.ObjectId
require('../../utils/success_code')
require('../../utils/error_code')

exports.purchase_course = async (req, res) => {
    try {
        let params_array = [{ name: 'user_id', type: "string" }, { name: "course_id", type: "string" }]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let find_course = await Course.findById(req.body.course_id)
        if (!find_course) {
            res.json({ success: false, error_code: USER_ERROR_CODE.COURSE_NOT_FOUND })
            return
        }
        let user_course = new User_course({
            course_id: req.body.course_id,
            user_id: req.body.user_id
        })
        await user_course.save()
        res.json({ success: true, message: USER_MESSAGE_CODE.ADD_SUCCESSFULLY })
    } catch (error) {
        utils.error_response(error, res)
    }
}

exports.get_course_details = async (req, res) => {
    try {
        let params_array = [{ name: 'user_id', type: "string" }]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code
        let match = {
            $match:{user_id:objectid(req.body.user_id)}
        } 
        let lookup = {
            $lookup:
            {
                from: "courses",
                localField: "course_id",
                foreignField: "_id",
                as: "course_details"
            }
        }
        let unwind = {
            $unwind:{
                path:"$course_details",
            }
        }
        let lookup_1 = {
            $lookup:
            {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user_details"
            }
        }
        let unwind_1 = {
            $unwind:{
                path:"$user_details",
            }
        }
        let user_course_details = await User_course.aggregate([match,lookup,unwind,lookup_1,unwind_1])
        res.json({ success: true, message: USER_MESSAGE_CODE.ADD_SUCCESSFULLY,user_course_details:user_course_details })
    } catch (error) {
        utils.error_response(error, res)
    }
}


exports.check_course_purchase = async (req, res) => {
    try {
        let params_array = [{ name: 'user_id', type: "string" },{ name: 'course_id', type: "string" }]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code
        let purchase_course = await User_course.findOne({user_id:req.body.user_id,course_id:req.body.course_id})
        let is_paid = false
        if(purchase_course){
            is_paid = true
        }
        res.json({ success: true, is_paid: is_paid })
    } catch (error) {
        utils.error_response(error, res)
    }
}