const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
app.use(express.json());

const cookieParser=require('cookie-parser');
app.use(cookieParser());

//getting db routes
const db=require('./db').db;
const userModels=require('./db').userModels;
const linksModels=require('./db').linksModels;


const showLinks=express.Router();

showLinks
.route('/')
.get(userLinks)

async function userLinks(req,res){
    const id=req.headers['x-access-tokens'];
    console.log(id);
    let result=await linksModels.find({userName:id})
    let name=await userModels.findOne({userName:id})
        
    console.log(result.length);
    // console.log(name);
    if(result.length>0)res.json({
        status:'ok',
        links:result,
        name:name.name
    });
    else res.json({status:'notfound'});
    console.log('reach-end');
    
}



showLinks
.route('/dashboard')
.get(getAllLinks)

async function getAllLinks(req,res){
    const userName=req.headers['x-access-token'];
    try{
        // const decode=jwt.verify(token,"Secret123")
        const data=await linksModels.find({userName:userName})
        // console.log(decode.userName);
        res.json({
            status:'ok',
            links:data
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:'err'
        })
    }

}



module.exports=showLinks;
