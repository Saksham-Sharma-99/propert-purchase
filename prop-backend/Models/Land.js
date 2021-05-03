const mongoose = require('mongoose')


const LandSchema = mongoose.Schema({
    name : String ,
    area : String , 
    city : String , 
    state : String,
    country : String
});
const Land = mongoose.model("Land" , LandSchema)

function SetupDemoData(){
    var lands = []
    for(let i=0 ; i<9 ; i++){
    const land = new Land({
        name : "Land-"+i,
        area : "area-"+i,
        city : "city-"+i,
        state : "state-"+i,
        country : "country-"+i
    })
    lands.push(land);
    }
    Land.find({},(err , items)=>{
        if(err==null && items.length === 0){
            Land.insertMany(lands,(err)=>{
                if(err !== null) console.log(err)
                else console.log("Successfully added items");
            })
        }
    })
}


module.exports = {
    Schema : LandSchema , 
    LandModel : Land,
    SetupDemoData : SetupDemoData,
}