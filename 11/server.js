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
    let found=false;
    users.forEach(user=>{
        if(user.email==email && user.number==number) return res.status(200).send("logged in");
    })
    return res.status(404).send("user not found");
});