const express = require('express');

const main = require("./database");

const userOne = require('./Model/schema');

const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const validuser = require('./Utils/validator');

const jwt = require('jsonwebtoken');

const userAuth = require('./Middleware/userAuth');

const validator = require('validator');


const app = express();



app.use(express.json());

app.use(cookieParser());



app.post('/register', async function(req, res){
    try{
        //Validate user before inserting:-
        validuser(req.body);

       req.body.password = await bcrypt.hash(req.body.password , 10)

    await userOne.create(req.body);
    res.send("User Added to Database successfully");

    }
    catch(err){
        res.status(500).send("Error: "+err.message);
    }
})


app.post('/login', async(req,res)=>{

    try{
        
       const peopleDetail = await userOne.findOne({emailId: req.body.emailId});
       
       const conformPassword = await bcrypt.compare(req.body.password, peopleDetail.password);
       if(!conformPassword)
            throw new Error("Invalid cradential");

       //token:
       const token_hai = jwt.sign({_id: peopleDetail._id, emailId: peopleDetail.emailId}, "Navin@2002",{
        expiresIn: "1d"
       })

       res.cookie('Token',token_hai);
       res.send("Login successfully");
    }
    catch(err){
        res.send("Error: "+err.message);
    }
})


app.post('/logout', userAuth, async(req,res)=>{
    try{
        //  res.cookie('Token', "Inavlid wala hai bhai apna se de rha hu");
        res.clearCookie("Token");
        res.send("Logout successfully");
    }
    catch(err){
        res.status(500).send("Error: "+err.message);
    }
})


// !Company standard logout
// app.post("/logout", userAuth, async (req, res) => {
//     try {

//         const token = req.cookies.Token;

//         // Optional: blacklist token
//         // await BlackList.create({ token });

//         res.clearCookie("Token", {
//             httpOnly: true,
//             secure: true,
//             sameSite: "Strict"
//         });

//         res.status(200).json({
//             success: true,
//             message: "Logout Successfully"
//         });

//     } catch (err) {

//         res.status(500).json({
//             success: false,
//             message: err.message
//         });

//     }
// });



app.get("/user",userAuth, async (req, res) => {
try {

            res.send(req.result);

    } 
        catch (err) {
            res.status(400).send("Error "+err.message);
            }
})


app.patch("/profile/edit",userAuth, async function(req,res){
    try{
        const allowedUpdates = ["age", "lastname", "about", "photoUrl","emailId"];

        const updates = Object.keys(req.body);

        const isValid = updates.every(field =>allowedUpdates.includes(field));
        // console.log(isValid)

        if (!isValid) {
        // return res.status(400).send("Invalid Updates");
        throw new Error('Invalid Updates')
        }
        // console.log(req.result._id)
        
            
         if(!validator.isEmail(req.body.emailId))
            throw new Error('Invalid Email');

    const user = await userOne.findByIdAndUpdate(req.result._id, req.body, {
        "runValidators": true
    }
        );

        res.json({updated: "Updated successfuly", updatedPart: req.body})
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

app.delete('/user/delete',userAuth, async(req, res)=>{
    try{
        console.log(req.result._id);
       await userOne.findByIdAndDelete(req.result._id);
       res.clearCookie('Token')
        res.send("Deleted successfully");
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})



main()
.then(() => {
    console.log("Connected to DB")
    app.listen(5000,()=>{
   console.log("Listen at PORT 5000")
    })
})
.catch((err) => {
    console.log(err)
});


