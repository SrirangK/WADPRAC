const express=require('express');
const mongoose=require('mongoose');

const PORT=8000;
const app=express();

const songSchema=new mongoose.Schema({
    name:{
        type: String,
    },
    film:{
        type: String,
    },
    director:{
        type: String,
    },
    singer:{
        type: String,
    },
    actor:{
        type: String,
    },
    actress:{
        type: String,
    }
});

const Song=new mongoose.model("Song",songSchema);

let songDetails=[
    { name: "ABC", film: "Film1", director: "Director1", singer: "Singer1" },
    { name: "DEF", film: "Film1", director: "Director1", singer: "Singer2" },
    { name: "GHI", film: "Film2", director: "Director2", singer: "Singer3" },
    { name: "JKL", film: "Film2", director: "Director3", singer: "Singer1" },
    { name: "MNO", film: "Film3", director: "Director1", singer: "Singer1" }   
]

mongoose.connect("mongodb://127.0.0.1:27017/music").then(()=>console.log("DB Connected!"));

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

async function addEntries(){
    try {
        const res=await Song.insertMany(songDetails);
        console.log(res);
    } catch (err) {
        console.log("error!");
    }
}

app.get("/display",async (req,res)=>{
    const count=await Song.countDocuments();
    const result=await Song.find();
    let html=`<h2>Total Songs:${count}</h2> <table><tr><th>Name</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
    result.forEach(element => {
        html+=`<tr><td>${element.name}</td><td>${element.film}</td><td>${element.director}</td><td>${element.singer}</td><td>${element.actor}</td><td>${element.actress}</td></tr>`
    });
    html+=`</table>`;
    res.send(html);
});

app.get("/directors/:dir/singers/:singer",async (req,res)=>{
    const result=await Song.find({
        director: req.params.dir,
        singer: req.params.singer
    });
    res.json(result);
});

app.get("/directors/:dir",async (req,res)=>{
    const result=await Song.find({
        director: req.params.dir,
    });
    res.json(result);
});

app.get("/films/:fil/singers/:singer",async (req,res)=>{
    const result=await Song.find({
        film: req.params.fil,
        singer: req.params.singer
    });
    res.json(result);
});

app.get("/delete/:name",async (req,res)=>{
    const result=await Song.deleteOne({
        name: req.params.name
    });
    res.json(result);
});

app.get("/update/:name",async (req,res)=>{
    const result=await Song.updateOne({
        name: req.params.name
    },
    {
        $set:{
            actor: "salman naan",
            actress: "salman naan"
        }
    });
});

async function addSong(){
    const song={ name: "song 4", film: "gda", director: "shahrukh naan", singer: "Singer1", actor: "salman naan", actress:"salman naan" }   
    const res=await Song.insertOne(song);
}


// addSong();
// deleteSong("DEF");
// addEntries();