const express=require('express');
const mongoose=require('mongoose');

const app=express();
// app.use(express.json());
// app.use(express.static('.'));

mongoose.connect("mongodb://127.0.0.1:27017/students").then(()=>console.log("DB Connected!"));

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    roll_no:{
        type:Number,
    },
    cc:{
        type:Number,
    },
    wad:{
        type:Number,
    },
    cns:{
        type:Number,
    },
    dsbda:{
        type:Number,
    },
    ai:{
        type:Number,
    }
});

const Student=mongoose.model("studentmarks",studentSchema);

app.listen(8000,()=>console.log("http://localhost:8000"));
const studentData=[
    {
        "name": "Alice",
        "roll_no": 1,
        "wad": 85,
        "cc": 78,
        "dsbda": 92,
        "cns": 88,
        "ai": 91
    },
    {
        "name": "Bob",
        "roll_no": 2,
        "wad": 75,
        "cc": 80,
        "dsbda":92,
        "cns": 82,
        "ai": 79
    }
]
const addEntries=async ()=>{
    try {
        const res=await Student.insertMany(studentData);
        console.log("Successfully added: "+res);
    } catch (error) {
        
    }
}
addEntries();

app.get('/',async (req,res)=>{
    const cnt=await Student.countDocuments();
    const data=await Student.find({});
    let html=`<h2>Count : ${cnt}</h2><table><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>CNS</th><th>DSBDA</th><th>AI</th></tr>`;
    data.forEach(student=>{
        html+=`<tr><td>${student.name}</td><td>${student.roll_no}</td><td>${student.wad}</td><td>${student.cc}</td><td>${student.cns}</td><td>${student.dsbda}</td><td>${student.ai}</td></tr>`;
    });
    html+=`</table>`;
    res.send(html);
});

app.get('/dsbda-passed',async (req,res)=>{
    const data=await Student.find({dsbda:{$gt:20}});
    let html=`<table><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>CNS</th><th>DSBDA</th><th>AI</th></tr>`;
    data.forEach(student=>{
        html+=`<tr><td>${student.name}</td><td>${student.roll_no}</td><td>${student.wad}</td><td>${student.cc}</td><td>${student.cns}</td><td>${student.dsbda}</td><td>${student.ai}</td></tr>`;
    });
    html+=`</table>`;
    res.send(html);
});

app.get('/toppers',async (req,res)=>{
    const data=await Student.find({dsbda:{$gt:25},cc:{$gt:25},cns:{$gt:25},wad:{$gt:25},ai:{$gt:25}});
    let html=`<table><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>CNS</th><th>DSBDA</th><th>AI</th></tr>`;
    data.forEach(student=>{
        html+=`<tr><td>${student.name}</td><td>${student.roll_no}</td><td>${student.wad}</td><td>${student.cc}</td><td>${student.cns}</td><td>${student.dsbda}</td><td>${student.ai}</td></tr>`;
    });
    html+=`</table>`;
    res.send(html);
});

app.get('/delete/:name',async (req,res)=>{
    const data=await Student.findOneAndDelete({name:req.params.name});
    res.send(data);
})

app.get('/update/:name',async (req,res)=>{
    const data=await Student.findOne({name:req.params.name});
    data.dsbda+=10;
    data.cns+=10;
    data.cc+=10;
    data.wad+=10;
    data.ai+=10;
    await data.save();
    res.send(data);
})