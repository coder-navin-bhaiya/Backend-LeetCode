// step-1)
 const http = require('http');

 //step-2) creating server
 const server = http.createServer((req,res) =>{

    //  res.end("First response send by server")
    


    //Using routing
     if(req.url === '/'){
        res.end("First response send by server")
    }
    else if(req.url === '/Contact'){
        res.end("It is contact routing");
    }

    else if(req.url === '/About'){
        res.end("It is About routing");
    }
    else{
        res.end("Error:Page not found");
    }


 });
 
//  console.log(server); o/p = object

//step-3) listen krna hai
 server.listen(4000,()=>{
    console.log("Server is listening at 4000")
 });
