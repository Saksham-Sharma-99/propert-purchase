const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : String ,
    email : String ,
    password : String
});
const User = mongoose.model("User" , UserSchema)

function SetupDemoUsers(){
    var users = []
    for(let i=0 ; i<2 ; i++){
    const user = new User({
        name : "User-"+i,
        email : "user-"+i+"@email.com",
        password : "pass-"+i
    })
    users.push(user);
    }
    User.find({},(err , items)=>{
        if(err==null && items.length === 0){
            User.insertMany(users,(err)=>{
                if(err !== null) console.log(err)
                else console.log("Successfully added users");
            })
        }
    })
}


module.exports = {
    Schema : UserSchema , 
    UserModel : User,
    SetupDemoData : SetupDemoUsers,
}