const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
    .then(()=>{
        console.log("Db connected");
    }).catch((error)=>{
        console.log(error);
    })

const authRoute = require('./routes/authRoutes');
const messageRoute = require('./routes/messagesRoute');
const userRoute = require('./routes/userRoutes');

// middlewares
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);



let port = 8080;

app.listen(port, ()=>{
    console.log(`server started at port : ${port}`);
})