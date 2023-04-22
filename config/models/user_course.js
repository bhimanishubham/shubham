let mongoose = require('mongoose')
let Schema = mongoose.Schema
let autoIncrement = require('mongoose-auto-increment')
let user_course_schema = new Schema({
    course_id:{
        type:Schema.Types.ObjectId
    },
    user_id:{
        type:Schema.Types.ObjectId
    }
},{
    strict:true,
    timestamps:true,
})

user_course_schema.plugin(autoIncrement.plugin,{model: 'user_course', field: 'unique_id', startAt: 1, incrementBy: 1})

module.exports = mongoose.model('user_course',user_course_schema)