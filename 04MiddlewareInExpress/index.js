const express = require('express');

const app = express();

const Bookstore = [
    {id:1, name:"Rich dad", author:"Navin"},
    {id:2, name:"Gunaho ke dewta", author:"ritesh"},
    {id:3, name:"half girlfriend", author:"chetan"},
    {id:4, name:"Friend", author:"Sonam sinha"}
]

//parser:- convert Json to JS object
app.use(express.json());

//!get:-
app.get("/user",(req, res)=>{
    res.send(Bookstore);
} )

//Dynamic routing
app.get("/user/:id",(req, res)=>{
    console.log(typeof req.params.id); //String as o/p
    //yaha jo id ata hai woh string ke form me aata hai so isko number main convert krna hai so for that we use parseInt or Number .
    //Todo) const id = Number(req.params.id)
    const id = Number(req.params.id)
    const Book = Bookstore.find(info=>info.id === id);
    res.send(Book);
} )

//!Post:-
app.post('/user',(req,res)=>{
    
    Bookstore.push(req.body);
    res.send("Data Saved");
})






//? server listen at 5000 
app.listen(5000, ()=>{
    console.log("Listening to 5000 port");
})