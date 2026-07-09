const express = require('express')
const app = express();
const main = require('./databse')
const myUser = require('./Models/users')

app.use(express.json());

app.get('/info', async (req,res) =>{
    const answer = await myUser.find({});
    res.send(answer);
})

app.post('/info', async (req, res)=>{
    const answer = new myUser(req.body);

    await answer.save();
    res.send("Successfully Updated");
})

main() 
.then(()=>{
    console.log("Connected to DB")
     app.listen(5000, () =>{
    console.log("Listen at Port 5000")
    })
})
.catch((err)=>console.log(err));

