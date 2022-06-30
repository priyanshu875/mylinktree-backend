//getting express
const express=require('express');
const app=express();
const session=require('express-session');
const cookieParser=require('cookie-parser');
const cors=require('cors');

app.use(cors());
app.use(cookieParser());
app.use(express.json());


//getting db routes
const db=require('./routes/db').db;
const userModels=require('./routes/db').userModels;

//getting showLinks route
const showLinks=require('./routes/showLinks');

//getting authRoute route
const authRoute=require('./routes/authRoute');

//getting operationRoute route
const operationRoute=require('./routes/operationRoute');

//sending route to showLinks
app.use('/links',showLinks);
app.use('/auth',authRoute);
app.use('/operation',operationRoute);


//indexjs page
app.get('/', async (req,res)=>{
    if(req.cookies.isLoggedIn){
        console.log(req.cookies.isLoggedIn);
    }
    if(req.cookies.ssnUserName){
        console.log('loggedin and still there');
    }
    res.json({message:'not loggedin and at indexjs'})
})


//server listening
app.listen(3001,()=>{
    console.log('server started');
})