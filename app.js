const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid'); 
const multer = require('multer');
const mongoose = require('mongoose');
const StudentRoutes = require('./routes/student');
const UserRoutes = require('./routes/User');
const CourseRoutes = require('./routes/course');
const OtpRoutes = require('./routes/otp');
const QuestionRouter = require('./routes/questions');
const PaymentRoute = require('./routes/payment');
const DairyRoute = require('./routes/dairy');
const ProgressRoute = require('./routes/progress');
const PersonalRoute = require('./routes/personal');
const ReminderRoute = require('./routes/reminder');
const PlansRoute = require('./routes/plans');
const MusicRoute = require('./routes/sounds');
const FavoriteRoute = require('./routes/favorites');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage(
  {
    destination: function(req, file, cb)
    {
      cb(null, 'images');
    },
    filename: function(req, file, cb)
    {
      cb(null, uuidv4());
    }
  }
);
const filefilter = (req, file, cb) =>
{
  if(file.mimetype ==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg')
  {
    cb(null, true);
  }
  else
  {
    cb(null, false);
  }
};
app.use(multer({storage: storage, fileFilter: filefilter}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));

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
app.use(bodyParser.json());
app.use(StudentRoutes);
app.use(UserRoutes);
app.use(CourseRoutes);
app.use(OtpRoutes);
app.use(QuestionRouter);
app.use(PaymentRoute);
app.use(DairyRoute);
app.use(ProgressRoute);
app.use(PersonalRoute);
app.use(ReminderRoute);
app.use(PlansRoute);
app.use(MusicRoute);
app.use(FavoriteRoute);
mongoose.connect('mongodb+srv://admin:ltKn8qOm9drd5YJ2@students.vdzdpl9.mongodb.net/students?retryWrites=true&w=majority')
.then(result =>
    {
        app.listen(3000);
    })
    .catch(err=>
     console.log(err));
