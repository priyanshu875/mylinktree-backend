const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());

// let ssn;

//getting db routes
const db=require('./db').db;
const userModels=require('./db').userModels;
const linksModels=require('./db').linksModels;

const operationRoute=express.Router();


//adding link req***
operationRoute
.route('/addlink')
.post(limitRoute,addLink);

// function protectRoute(req,res,next){
//     if(req.cookies.isLoggedIn && req.cookies.ssnUserName){
//         next();
//     }
//     else{
//         res.json({
//             status:'user not loggedin'
//         })
//     }
// }

async function limitRoute(req,res,next){
    console.log(req.body.userName);
    let result=await linksModels.find({userName:req.body.userName});
    if(result.length<5){
        next();
    }
    else{
        res.json({
            status:'limit full ,first delete some'
        })
    }
}
async function addLink(req,res){
    let result=await linksModels.create(req.body);
    res.json({
        status:'link-added',
        data:result
    })
}

//deleting link req***
operationRoute
.route('/deletelink/:deleteid')
.post(deleteLink)

async function deleteLink(req,res){
    const _id=req.params['deleteid'];
    console.log(_id);
    try{
    const result2=await linksModels.findByIdAndDelete({_id});
    // console.log(result2);
    if(result2){
        res.json({
            status:"ok"
        })
    }
    }
    catch(err){
        console.log(err);
        res.json({
            status:"err"
        })
    }
    
}

module.exports=operationRoute;