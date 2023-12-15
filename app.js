const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid'); 
const multer = require('multer');
const User = require('./models/user');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/User');

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
const NotificationRoute = require('./routes/notify');
const CardsRoute = require('./routes/cards');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const ActiveRoute = require('./routes/activeplans');
const workouts = require('./routes/workouts');
const trainRoute = require('./routes/trainer');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const MONGODB_URI=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@students.vdzdpl9.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const store = new MongoDbStore({
uri: MONGODB_URI,
collection: 'sessions',
});

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
app.use(UserRoutes);
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
app.use(NotificationRoute);
app.use(CardsRoute);
app.use(ActiveRoute);
app.use(workouts);
app.use(trainRoute);
mongoose.connect("mongodb+srv://admin:ltKn8qOm9drd5YJ2@students.vdzdpl9.mongodb.net/students?retryWrites=true&w=majority")
.then(result =>
    {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err=>
     console.log(err));
