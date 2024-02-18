const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        trim : true,
    },
    username : {
        type : String,
        trim : true,
        unique : true,
    },
    email : {
        type : String,
        trim : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
        enum : ["male", "female"],
    },
    profilePic : {
        type : String,
        trim : true,
        default : ""
    }
}, {timestamps : true});

const User =  mongoose.model('User', userSchema);

module.exports = User;