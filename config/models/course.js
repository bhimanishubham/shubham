let mongoose = require('mongoose')
let Schema = mongoose.Schema
let autoIncrement = require('mongoose-auto-increment')
let course_schema = new Schema({
    name:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    student_no:{
        type:String,
        default:''
    },
    students : {
        type : Array ,
        default : ''
    }
},{
    strict:true,
    timestamps:true,
})

course_schema.plugin(autoIncrement.plugin,{model: 'course', field: 'unique_id', startAt: 1, incrementBy: 1})

module.exports = mongoose.model('course',course_schema)