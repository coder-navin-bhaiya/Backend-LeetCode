const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema =  new Schema({
    // name: String,
    // age: Number,
    // city: String,
    // gender: String
    //Another Method:-
    firstname:{
        type: String,
        min: 3,
        max: 10,
        required: true,
        
        
    },
    lastname:{
        type: String,
        min: 3,
        max: 10
    },
    age:{
        type: Number,
        min: 14,
        max: 70,
        required: true
    },
    gender:{
        type: String,
        // enum: ["male", "female", "others"]
        //Or another way
        validate(value){
             if(!["male","female","others"].includes(value))
                throw new Error("Invalid gender")
        }
       
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    },

    password:{
        type: String
    },

    photo:{
        type: String
    }
},
    {
        timestamps: true,
    }
)

const userDetail = mongoose.model('user',UserSchema);

module.exports = userDetail;