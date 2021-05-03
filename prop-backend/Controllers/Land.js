const mongoose = require('mongoose')
const Land = require('../Models/Land.js')

function AddNewLand(name , area , city , state , country , callback){
    Land.LandModel.find({name:name} , (err,lands)=>{
            if(err == null && lands.length == 0){
                var newLand = new Land.LandModel({
                    name : name , 
                    area : area,
                    city : city,
                    state : state , 
                    country : country
                })
                Land.LandModel.insertMany(newLand , (err)=>{
                    if(err) {
                        console.log("error",err);
                        callback(err , null)
                    }
                    else {
                        console.log("Land Created successfully");
                        callback(null , newLand)
                    }
                })
            }else if (lands.length != 0){
                console.log("Land already exists");
                callback("Land Exists" , null)
            }else{
                console.log(err);
                callback(err,null)
            }
        })
}

function UpdateLand(id , name , callback){
    Land.LandModel.findById(id , (err,land)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }else if (land==null){
            console.log("No such land Exisits");
            callback("No such land exists" , null)
        }else{
            console.log("Land found",land);
            land.name = name
            land.save();
            console.log("Land updated" , land);
            callback(null , land)
        }
    })
}

function DeleteLand(id , callback){
    Land.LandModel.findByIdAndRemove(id , (err,land)=>{
        if(err != null){
            console.log(err);
            callback(err,null)
        }else if (land==null){
            console.log("No such land Exisits");
            callback("No such land exists" , null)
        }else{
            console.log("Land deleted" , land);
            callback(null , {message :"Land removed"})
        }
    })
}


module.exports = {
    AddNewLand : AddNewLand,
    UpdateLand : UpdateLand,
    DeleteLand : DeleteLand
}