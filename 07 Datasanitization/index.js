const express = require('express');
const app = express();
const main  = require('./database');
const user_detail = require('./Models/User')

app.use(express.json());

app.post('/register', async(req, res) =>{

    try{
        const mandatoryFields = ["firstname","emailId","password","age"];
        
        const isAllowed = mandatoryFields.every((k)=>Object.keys(req.body).includes(k));

        if(!isAllowed)
            throw new Error("Not Allowed");
        
    await user_detail.create(req.body)
    res.send("User Register Successfully")

    }

    catch(err){
        res.status(500).send("Error "+err.message);
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
      const result =  await user_detail.findById(req.params.id);  
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
        console.log("Listen at port 5000")
    })
})
.catch((err) => console.log(err))