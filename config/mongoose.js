let mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
module.exports = async () => {
    try {
        // declarer global models
        autoIncrement.initialize(mongoose.connection)
        require('./models/admin')
        require('./models/course')
        require('./models/user')
        require('./models/user_course')
        let db =  await mongoose.connect('mongodb+srv://jaydev:EO2nFvV4osuarhy9@cluster0.ycumbpw.mongodb.net/test?retryWrites=true&w=majority')
        return db;
    } catch (error) {
        console.log(error)
    }
}