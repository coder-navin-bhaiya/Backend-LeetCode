const express = require('express');

const app = express();

const main = require('./database');

const userDetail = require('./Model/userSchema');

const validuser = require('./utils/validator');

const bcrypt = require('bcrypt');

app.use(express.json());


app.post('/register', async(req,res) =>{
    console.log(req.body);

    try{
        // const mandatoryFields = ["firstname","emailId","password","age"];
        
        // const isAllowed = mandatoryFields.every((k)=>Object.keys(req.body).includes(k));

        // if(!isAllowed)
        //     throw new Error("Not Allowed");
            //! Another method:- used validator folder(Here utils ke andar hai) taki hochpoch na ho jaye
            validuser(req.body);

            //! For password:-
            // const salt = await bcrypt.genSalt(10);
            // req.body.password = await bcrypt.hash(req.body.password, salt)
            // Another but dono ka  kaaam same
          req.body.password = await bcrypt.hash(req.body.password, 10);
        
    await userDetail.create(req.body)
    res.send("User Register Successfully")

    }

    catch(err){
        res.status(500).send("Error "+err.message);
    }
})

app.post('/login', async(req,res)=>{
    try{
        
       const peopleDetail = await userDetail.findById(req.body.id);

       if(!req.body.emailId === peopleDetail.emailId)
        throw new Error("Invalid Credential");
    
        const isAllowed = bcrypt.compare(req.body.password, peopleDetail.password);
        if(!isAllowed)
            throw new Error('Invalid credential');

        res.send("Login successfully")



    }
    catch(err){
        res.send("Error: "+err.message);
    }
})

app.get('/feed', async(req,res)=>{
    
    try{
      const result =  await user_detail.find();
      res.send(result);
    }
    catch(err){
        res.send("Error "+err.message);
    }
})


//Find user by id
app.get('/users/:id', async(req,res)=>{
    try{
      const result =  await userDetail.findById(req.params.id);  
        res.send(result);

    }
    catch(err){
        res.send("Error "+err.message);
    }
})

//Delete 
app.delete('/delete/user/:id', async (req, res) => {

 try {

        await user_detail.findByIdAndDelete(req.params.id);
        res.send('Deleted successfully');
 } 

    catch (error) {
        res.send(error.message);
    }

});

main()
.then(()=>{
    console.log("Connected to DB")
    app.listen(5000, ()=>{
    console.log("Listen to port 5000")
    })
})
.catch((err)=>{
    console.log(err)
})
