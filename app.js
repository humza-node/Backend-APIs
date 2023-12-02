const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid'); 
const multer = require('multer');
const mongoose = require('mongoose');
const StudentRoutes = require('./routes/student');
const UserRoutes = require('./routes/User');


app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

app.use(StudentRoutes);
app.use(UserRoutes);
mongoose.connect('mongodb+srv://admin:ltKn8qOm9drd5YJ2@students.vdzdpl9.mongodb.net/students?retryWrites=true&w=majority')
.then(result =>
    {
        app.listen(3000);
    })
    .catch(err=>
     console.log(err));
