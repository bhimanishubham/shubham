let crypto = require('crypto')
let utils = require('../../utils/utils')
let Users = require('mongoose').model('user')
let Course = require('mongoose').model('course')
let User_course = require('mongoose').model('user_course')
require('../../utils/success_code')
require('../../utils/error_code')

exports.referral_list = async function (req, res) {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let referral_list = await Users.aggregate([
            { $match: { "referred_by": { $ne: null } } },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "details"
                }
            },
            {
                $unwind: {
                    path: "$details"
                }
            },
            {
                $group:
                {
                    _id: "$referred_by",
                    total_count: { $sum: 1 },
                    first_name: { $first: "$details.name" },
                    email: { $first: "$details.email" },
                    phone: { $first: "$details.phone" }
                },
            }
        ])
        res.json({ success: true, referral_list_details: referral_list, })
    } catch (error) {
        console.log(error);
        utils.error_response(error, res)
    }
}

exports.user_course_list = async (req, res) => {
    try {
        let params_array = []
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
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
        let user_course_details = await User_course.aggregate([lookup,unwind,lookup_1,unwind_1])
        res.json({ success: true, message: USER_MESSAGE_CODE.ADD_SUCCESSFULLY,user_course_details:user_course_details })
    } catch (error) {
        utils.error_response(error, res)
    }
}


exports.referral = async (req,res) => {
    try {
        let params_array = [{name:'id',type:"string"}]
        let response = await utils.check_request_params_async(req.body, params_array)
        if (!response.success) {
            res.json(response)
            return;
        }
        // code 
        let user = await Users.find({referred_by :req.body.id})
        res.json({success:true,user : user})
        return
    } catch (error) {
        utils.error_response(error, res)
    }
}