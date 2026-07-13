
const jwt = require("jsonwebtoken");

const userOne = require('../Model/schema');

const userAuth = async(req,res,next)=>{
    try{
        
    const token = req.cookies.Token;

    const payload = jwt.verify(token, "Navin@2002");
    
            const id = payload._id;
            if(!id){
                throw new Error("ID is missing")
            }
    
            const result = await userOne.findById(id);
            if(!result){
                throw new Error("User Doesn't exist");
            }

                req.result = result

                next();
    
    } 
            catch (err) {
                res.status(400).send("Error: "+err.message);
            }
    
}

module.exports = userAuth;