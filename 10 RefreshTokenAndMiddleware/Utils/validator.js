const validator = require('validator');

function validuser(data){
    
        const mandatoryFields = ["firstname","emailId","password","age"];
    
        const isAllowed = mandatoryFields.every((k)=>Object.keys(data).includes(k))
           
        
        if(!isAllowed)
            throw new Error("Not Allowed");
            
        if(!validator.isEmail(data.emailId))
            throw new Error('Invalid Email');
    
         if(!validator.isStrongPassword(data.password))
                    throw new Error('Invalid Password')
        
                //for firstaname length
         if(!(data.firstname.length >= 3 && data.firstname.length <= 10)){
                  throw new Error("Name should have atleast 3 character and atmost 10")
        }
        
    
    

}
module.exports = validuser;