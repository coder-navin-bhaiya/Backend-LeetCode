//!Step-1)
const express = require('express');

//!step-2) Create server
const app = express(); // instance(object) of app means server return an object
// console.log("App👉", app);


//!step-5) Routing
app.use("/about",(req,res)=>{
    res.send({name:"Navin", age:18});
})

app.use('/contact',(req,res)=>{
    res.send("I am your contact page");
})

//Todo :- creating dynamic routing
app.use("/profile/:id/:user",(req,res)=>{

    console.log(req.params); //{ id: '69', user: 'navin' }
    res.send({name:"Navin", age:18, college:"CIT"});

})

//!Step-4) For reply means server respond to the client
app.use("/", (req,res) =>{
    // res.send("Hello Ji from express server");
    //send api in json format:-
    //res.send({"name":"Navin", "age":18, "order_Id": 1234 })
    //or
    res.send({name:"Navin", age:18, order_Id: 1234 });
})
//This "/" route last main hoga beacuse JS line by line execute hota hai so agar hum /about karenga aur ye "/" wala code agar upar hoga toh hum kuch bhi kr le /about ke path main nahi ja sakta . Kyuki JS sabsa pehla /about main / ko dakhega and usko lagega ke about / ke andar hoga so woh "/" wala path main chala jayega. so ese se bachna ke liya hum isko last main likhta hai


//!step-3) Listen server or Start the server

app.listen(5000, () =>{
    console.log("Listen at Port 5000")
});