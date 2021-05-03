const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { Verify, VerifyToken } = require('./Controllers/Auth')
const { AddNewLand, UpdateLand, DeleteLand } = require('./Controllers/Land')
const { AddUser, Login } = require('./Controllers/User')
const User = require('./Models/User')
const Land = require(__dirname + "/Models/Land.js")

mongoose.connect('mongodb://127.0.0.1:27017/landsDB' , {useNewUrlParser : true,useUnifiedTopology: true})
app.use(cors());
app.use(bodyParser.json())

//new user
app.post("/user/register",(req,res)=>{
    console.log(req.body)
    AddUser(req.body.name , req.body.email , req.body.pass , (err,newUser)=>{
        if(err == null){
            res.json({
                message : "user created successfully",
                newUser
            })
        }else{
            res.json({
                error : err
            })
        }
    })
})

//login
app.post("/user/login",(req,res)=>{
    console.log(req.body)
    Login(req.body.email , req.body.pass , (err,user , token)=>{
        if (err != null ){
            res.json({
                error : err
            })
        }else{
            res.json({
                message : "logged in",
                user,
                token
            })
        }
    })
})

//create land
app.post("/land" , Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err == null){
            AddNewLand(req.body.name , req.body.area , req.body.city , req.body.state , req.body.country , 
                (err,newLand)=>{
                    if(err == null){
                        res.json({
                            message : "Land created successfully",
                            newLand
                        })
                    }else{
                        res.json({
                            error : err
                        })
                    }
                })
        }
    })
})

//update land
app.put("/land/:id", Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err!=null){
            res.json({
                error : err
            })
        }else{
            UpdateLand(req.params.id , req.body.name , (err,updatedLand)=>{
                if(err != null){
                    res.json({
                        error:err
                    })
                }else{
                    res.json({
                        updatedLand
                    })
                }
            })            
        }
    })
})

//delete land
app.delete("/land/:id",Verify , (req,res)=>{
    VerifyToken(req.token , (err,_)=>{
        if(err != null){
            res.json({
                error : err
            })
        }else{
            DeleteLand(req.params.id , (err,msg)=>{
                if(err != null){
                    res.json({
                        error : err
                    })
                }else{
                    res.json({
                        msg
                    })
                }
            })
        }
    })
})

//get lands
app.get("/lands",Verify , (req,res)=>{
    VerifyToken(req.token , (err,authData)=>{
        if(err == null){
            Land.LandModel.find({} , (err,lands)=>{
                if(err==null){
                    console.log("Found lands" , lands);
                    res.json({
                        authData,
                        lands
                    })
                }else{
                    res.json({
                        error: err
                    })
                }
            })
            
        }else{
            res.json({
                error : err
            })
        }
    })
})



app.listen(5000 , ()=>{
    console.log("Started Listening on port",5000);
    Land.SetupDemoData()
    User.SetupDemoData()
})



