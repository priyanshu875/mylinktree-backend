const mongoose=require('mongoose');
const db_link="mongodb+srv://stvpri:agarwal@cluster0.r2ge4.mongodb.net/?retryWrites=true&w=majority";

//connection mongodb
let db=mongoose.connect(db_link)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    if(err){
        console.log(err);
    }
})


//userModels
const userModels=mongoose.model('usermodels',mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    userName:{
        type:String
        
    }
}))

//linksModels
const linksModels=mongoose.model('linksmodels',mongoose.Schema({
    userName:{
        type:String
    },
    linkName:{
        type:String
    },
    linkUrl:{
        type:String
    }
}))


///exporting 
module.exports={
    db,
    userModels,
    linksModels
}
