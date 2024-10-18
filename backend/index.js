const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const app = express();
app.use(express.json())
require('dotenv').config();

app.post('/todo',async (req, res)=>{
    let createPayload = req.body;
    const parsepayload = createTodo.safeParse(createPayload);
    if(!parsepayload.success){
        res.status(411).json({
            msg : "you sent wrong inputs"
        })
        return;
    } 
    // put it in mongodb
    try {
        await Todo.create({
            title : createPayload.title,
            description : createPayload.description,
            completed : false
        })
        res.json({
            msg : "Todo created successfully"
        })
    } catch (error) {
        res.json({
            msg : "Failed to add Todo"
        })
    }
})

app.get('/todos', async (req, res)=>{
    let todos = await Todo.find({});
    res.json({
        todos
    })
})

app.put('/completed', async (req, res)=>{
    let updatePayload = req.body;
    let parsedId = updateTodo.safeParse(updatePayload);
    if(!parsedId.success){
        res.status(411).json({
            msg : "Something went wrong"
        })
        return;
    }
    try {
        await Todo.updateOne({
            _id : updatePayload.id
        }, {
            completed : true
        })
        res.json({
            msg : "Todo marked as completed"
        })
    } catch (error) {
        res.status(500).json({
            msg : "Failed to mark as done"
        })
    }
})

app.listen(process.env.PORT, ()=>{
    console.log("server running on " + process.env.PORT)
})