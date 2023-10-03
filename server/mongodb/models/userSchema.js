import mongoose from "mongoose";
const passportLocalMongoose = require('passport-local-mongoose')
const mongooseBcrypt = require('mongoose-bcrypt')

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true, 
        lowercase: true,
    },
    username: { 
        type: String, 
        required: true ,
        trim: true,
        max:15,
    },
    password: { 
        type: String, 
        required: true, 
        bcrypt: true,
    },
    isAdmin:{ 
        type: Boolean, 
        default: false
    },
    avatar:{
        type: String, 
        require: true 
    }

});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;