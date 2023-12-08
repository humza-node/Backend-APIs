const Reminder = require('../models/reminders');
const User = require('../models/user');
exports.addReminder = async(req, res, next) =>
{
 const set_time = req.body.set_time;
 const repeatDays = req.body.repeatDays;
 const start_time = req.body.start_time;
 const end_time = req.body.end_time;
 const Interval = req.body.Interval;
 const Sleep_set_time = req.body.Sleep_set_time;
 const Sleep_repeatDays = req.body.Sleep_repeatDays;
 const userId = req.body.userId;
 const user = await User.findById(userId);
 const reminder = new Reminder(
    {
        
            set_time: set_time,
            repeatDays: repeatDays,
        
        
    
            start_time: start_time,
            end_time: end_time,
            Interval: Interval,
    

    Sleep_set_time: Sleep_set_time,
    Sleep_repeatDays: Sleep_repeatDays,

users: [user._id]
    });
    const result = await reminder.save();
    res.status(200).json({message: "Reminders Created", result});
};
exports.getReminders = async(req, res, next) =>
{
    const results = await Reminder.find();
    res.status(200).json({message: "Fetched Reminders", results});
};

exports.updateReminders = async (req, res, next) =>
{
  const reminderId = req.params.reminderId;
  const set_time = req.body.set_time;
  const repeatDays = req.body.repeatDays;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const Interval = req.body.Interval;
  const Sleep_set_time = req.body.Sleep_set_time;
  const Sleep_repeatDays = req.body.Sleep_repeatDays;
  const userId = req.body.userId;
  const user = await User.findById(userId);
  const remind = await Reminder.findById(reminderId);
        if(!remind)
        {
            const error = new Error("Could Not Find Reminders");
            error.statusCode = 404;
            throw error;
        }
        remind.set_time=set_time;
        remind.repeatDays=repeatDays;
        remind.start_time=start_time;
        remind.end_time=end_time;
        remind.Interval = Interval;
    remind.Sleep_set_time = Sleep_set_time;
    remind.Sleep_repeatDays = Sleep_repeatDays;
    remind.users = [user._id]
    const result = await remind.save();
 return res.status(200).json({message: "Reminders updates",  result});
};
exports.deleteReminder = async(req, res, next) =>
{
    const reminderId = req.params.reminderId;
    Reminder.findById(reminderId).then(remind =>
        {
            if(!remind)
            {
                const error = new Error("Could not find Reminders");
                error.statusCode = 500;
                throw error;
            }
            return Reminder.findByIdAndDelete(reminderId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Reminders Deleted", result});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                });
};
