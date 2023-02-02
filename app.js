const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const mongoose = require('mongoose')
const User = require("./models/User");
const dotenv= require('dotenv')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => console.log("server connected"))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.Fname,
            lastName: req.body.Lname,
            email: req.body.email
        });
        const user = await newUser.save();
        res.status(200).sendFile(__dirname+"/success.html");
    }catch(err){
        res.status(500).sendFile(__dirname+"/failure.html");
    }
   
})

app.post("/failure", (req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})



app.listen(3000, () => {
    console.log("server is running on 3000")
})