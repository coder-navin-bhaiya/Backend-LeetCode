const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
    await mongoose.connect('mongodb+srv://navinkr:Navin%402002@navincluster.lp3kp7q.mongodb.net/BookStore');
          //Bookstore database ka name hai. Agar Bookstore eist krta haio toh thik warna apna aap ban jayega


    const userSchema = new Schema({
        name: String,
        age: Number,
        city: String,
        gender: String
    })


// Model ko create krna === collection ko create krna(Table create karna)
//Or esko ek Class bhi bol sakta hai
const myUser = mongoose.model('user', userSchema); //User collection ka name hai and userscehma ye batata hai ke document main kon kon sa field hoga

//Object create krna or document create krna
const user1 = new myUser({name: "Navin"});
await user1.save();
}

main()
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err));


//sabsa pehla cluster --> fir database --> fir collection -->fir document
//mongodb+srv://navinkr:Navin%402002@navincluster.lp3kp7q.mongodb.net/BookStore (cluster) --> Bookstore(databse) --> myUser(coll)