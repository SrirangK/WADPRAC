const express=require('express');
let users=[];
const app=express();

app.use(express.static('.'));
app.use(express.json());

app.listen(8000,console.log("http://localhost:8000"));

app.post('/post',(req,res)=>{
    const {name,email,number,dob,city}=req.body;
    users.push({
        "name":name,
        "email":email,
        "number":number,
        "dob":dob,
        "city":city
    });
    console.log(users);
    return res.status(200).send(users);
})

app.post('/login',(req,res)=>{
    const {email,number}=req.body;
    const match = users.find(user=>
        user.email===email && user.number===number
    );
    console.log("users",users);
    if(match){
        // found=true;
        return res.status(200).send("login successfull");
    }
    return res.status(404).send("user not found");
});

app.get('/get',(req,res)=>{
    return res.status(200).send(users);
});