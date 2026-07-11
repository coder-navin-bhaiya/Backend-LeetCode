const express = require('express');

const app = express();

const main = require('./database')

const userOne = require('./Model/userschema');

const validuser = require('./Utils/validator')

const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(cookieParser());


app.post('/register', async(req,res)=>{

    try{
        console.log("1")
        //validate the user
        validuser(req.body);
        console.log("2")

        //!For password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log("3")
       await userOne.create(req.body);
       console.log("4")
       res.send("User Register Successfully");
       console.log("5")
    }
    catch(err){
        res.send("Error: "+err.message);
    }

})

app.post('/login', async(req, res)=>{
    
    try{
        const peopleDetail = await userOne.findOne({emailId: req.body.emailId});

        const conformPassword = await bcrypt.compare(req.body.password, peopleDetail.password);
        if(!conformPassword)
            throw new Error('Invalid Credential');

        //Cookie:-
        // JWT Token generate karna - payload + key (Header khud add kar dega, huma dene ke jarurat nahi hai) 
                const token = jwt.sign({_id: peopleDetail._id, emailId: peopleDetail.emailId}, "Navin@2002");

        res.cookie('Token', token) // res.cookie("key","value"); value = token(secret key)

        res.send("Login Successfully");
    }
    catch(err){
        res.send('Error: '+err.message);
    }

})


app.get("/info", async (req, res) => {
try {
            // Token ko cookies se nikalo
                console.log(req.cookies) //! It give object :- { Token: 'NAvinKumar' }

            const token = req.cookies.Token;
    
            // Verify karo - valid hua to payload milega, nahi to error throw hoga
            const payload = jwt.verify(token,'Navin@2002' );

            // Ab humein user ki id URL mein expose nahi karni padi -
            // payload se hi _id mil gayi

                const user = await userOne.findById(payload._id);
                res.send(user);
        } 
            catch (err) {
            res.status(401).send("Invalid or Expired Token");
             }
})


main()
.then(()=>{
    console.log("Connected to DB")
    app.listen(5000, ()=>{
    console.log("Listen to Port 5000")
    })
})
.catch((err)=>{
    console.log(err);
})
