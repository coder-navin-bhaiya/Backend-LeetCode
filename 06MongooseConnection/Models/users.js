const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
        name: String,
        age: Number,
        city: String,
        gender: String
    })


const myUser = mongoose.model('user', userSchema);

module.exports = myUser;