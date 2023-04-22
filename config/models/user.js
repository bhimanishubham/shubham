let mongoose = require('mongoose')
let Schema = mongoose.Schema
let autoIncrement = require('mongoose-auto-increment')
let user_schema = new Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    whatsApp:{
        type:String,
        default:""
    },
    dob : {
        type : Date , 
        default : null
    },
    last_degree :{type : String , default : ""},//Ongoing Degree (or last Degree)
    last_college :{type : String , default : ""},//Current College (or Last College)
    complete_current_degree_in_year :{type : String , default : ""},//You will complete current degree in year?
    tenth_passed_year :{type : String , default : ""},//10th Passed Year (eg. 2010)
    twelfth_passed_year :{type : String , default : ""},//12th Passed Year (eg. 2012)
    interest_for_courses :{type : Array , default : []},//Interest for Courses
    /* 
    Website Development (PHP, Ci, WordPress, Laravel)
    Python Development
    Graphics Designing
    Web Designing (Angular Js & React Js)
    Digital Marketing
    Mobile App Development
    Basic Computer
    Miracle Software
    Networking
    Other:
    */
    city :{type : String , default : ""},//Your Current City
    preference_location :{type : String , default : ""},// After Internship what's your preference location
    skills_you_know :{type : String , default : ""},//skills you know
    comfortable_internship_type : {type : String , default : ""},//Comfortable Internship type
    password:{
        type:String,
        default:''
    },
    reference_name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:''
    },
    jwt:{
        type:String,
        default:""
    },
    token:{
        type:String,
        default:""
    },
    referral_code:{
        type:String,
        default:""
    },
    referred_by:{
        type:Schema.Types.ObjectId,
        default: null
    },
    referred_credit:{
        type:Number,
        default:0,
    }
},{
    strict:true,
    timestamps:true,
})

user_schema.plugin(autoIncrement.plugin,{model: 'user', field: 'unique_id', startAt: 1, incrementBy: 1})

module.exports = mongoose.model('user',user_schema)