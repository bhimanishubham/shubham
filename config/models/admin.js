let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminschema = new Schema({
	username: {type: String, default: ""},
	password: {type: String, default: ""},
	email: {type: String, default: ""},
	phone : {type : String , default : ''},
	role_type: {type: Number, default: 0},
	main:{type:Boolean,default:false},
	url_array: {type: Array, default: []},
	jwt:{type:String,default:''},
	token:{type:String,default:''},
},{
    strict:true,
    timestamps:true,
});

module.exports = mongoose.model('admin',adminschema);



