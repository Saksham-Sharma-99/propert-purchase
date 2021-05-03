const User = require('../Models/User.js')
const jwt = require("jsonwebtoken")

function AddUser(name , email , pass , callback){
    User.UserModel.findOne({email:email} , (err,user)=>{
        if(err != null){
            console.log(err)
            callback(err , null)
        }else if (user==null){
            var newUser = new User.UserModel({
                name : name,
                email : email,
                password : pass
            })
            User.UserModel.insertMany(newUser , (err)=>{
                if(err) {
                    console.log("error",err);
                    callback(err , null)
                }
                else {
                    console.log("User Created successfully");
                    callback(null , newUser)
                }
            })
        }else{
            callback("User Exists" , null)
        }
    })  
}

function Login(email , pass , callback){
    User.UserModel.find({email:email , password:pass} , (err,user)=>{
        if(err != null){
            console.log(err)
            callback(err , null , null)
        }else if(user == null){
            console.log("user doesn't exist")
            callback("user doesn't exist" , null , null)
        }else{
            console.log("found user : " , user[0])
            jwt.sign({user:user[0]} , "secretkey" , (err,token)=>{
                if(err!= null){
                    console.log(err)
                    callback(err,null,null)
                }else{
                    console.log("successfully signed in");
                    callback(null , user[0] , token)
                }
            })
        }
    })
}

module.exports ={
    AddUser : AddUser,
    Login : Login
}