const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();

app.use(express.json());

// let ssn;

//getting db routes
const db=require('./db').db;
const userModels=require('./db').userModels;

const authRoute=express.Router();


//signup user req****
authRoute
.route('/signup')
.post(signUpUser)

async function signUpUser(req,res){
    let userName="";
    for(let i=0;i<req.body.email.length;i++){
        if(req.body.email[i]=='@')break;
        userName=userName+req.body.email[i];
    }
    req.body.userName=userName;
    
    let result=await userModels.create(req.body);
    console.log(result);
    console.log(req.body);
    if(result){
        res.json({
            status:'ok',
            respondedData:result
        })
    }
    else{
        res.json({
            status:'err',
        })
    }
}

//signin req / login req****
authRoute
.route('/signin')
.post(signInUser)

async function signInUser(req,res){
    // console.log(req.body);
    let result=await userModels.findOne({email:req.body.email});
    
    if(result && result.password==req.body.password){
        const token=jwt.sign({
                name:result.name,
                userName:result.userName
            },
            'priyanshu123'
        )

        console.log(result);
        
        return res.json({
            status:'ok',
            user:token
        });
    }
    else return res.json({
        status:"err"
    })
    
}


//logout req****
authRoute
.route('/logout')
.get(logOut)

async function logOut(req,res){
   if(localStorage.getItem('token')){
    localStorage.removeItem('token');
    
    res.json({
        msg:'found and logging out and cleared ssnUserName',
    })
   }
   else{
    res.json({
        msg:'you were not loggedin'
    })
   }
   window.location.href='/login';
   
}


//exporting authRoute
module.exports=authRoute;

