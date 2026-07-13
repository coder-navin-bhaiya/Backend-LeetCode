const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb+srv://navinkr:Navin%402002@navincluster.lp3kp7q.mongodb.net/UserDetail')
}

module.exports = main;