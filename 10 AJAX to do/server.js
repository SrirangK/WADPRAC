const express=require('express');
const fs=require('fs');
// const cors=require('cors');

const app=express();
tasks=[];

app.use(express.static('.'));
app.use(express.json());
// app.use(cors())

app.listen(8000,()=>console.log("http://localhost:8000"));

app.get('/tasks',(req,res)=>{
    return res.status(200).json(tasks);
})

app.post('/tasks',(req,res)=>{
    if(!req.body.task) return res.status(400).send("No task specified");
    tasks.push(req.body.task)
    return res.status(201).json(tasks);
})

app.post('/tasks/delete',(req,res)=>{
    tasks.splice(req.body.index,1);
    return res.status(200).send("Task deleted successfully!");
})

app.post('/tasks/update', (req, res) => {
    const { index, task } = req.body;
    if (index < 0 || index >= tasks.length) return res.status(400).send("Invalid index");
    tasks[index] = task;
    return res.status(200).send("Task updated successfully!");
});
