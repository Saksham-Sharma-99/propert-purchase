const jwt = require("jsonwebtoken")

function Verify(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403) 
    }
}

function VerifyToken(token,callback){
    jwt.verify(token , 'secretkey' , (err , authData)=>{
        if (err != null){
            console.log(err);
            callback(err,null)
        }else{
            callback(null , authData)
        }
    })
}



module.exports ={
    Verify : Verify,
    VerifyToken : VerifyToken
}