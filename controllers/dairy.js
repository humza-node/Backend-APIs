const Dairy =  require('../models/dairy');
const User = require('../models/user');
const Sounds = require('../models/sounds');
exports.CreateDairy = async(req, res, next) =>
{
    const calendarDate = req.body.calendarDate;
    const moodRate = req.body.moodRate;
    const reminders = req.body.reminders;
    const deepSleep = req.body.deepSleep;
    const lightSleep = req.body.lightSleep;
    const bedtime = req.body.bedtime;
    const wakeuptime = req.body.wakeuptime;
    const sleepGoals = req.body.sleepGoals;
    const remaining = req.body.remaining;
    const intake = req.body.intake;
    const target = req.body.target;
    const soundId = req.body.soundId;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const sound = await Sounds.findById(soundId);
const dairy = new Dairy(
    {
        calendarDate: calendarDate,
        moodRate: moodRate,
        reminders: reminders,
        
        
deepSleep: deepSleep,
lightSleep: lightSleep,
bedtime: bedtime,
wakeuptime: wakeuptime,
sleepGoals: sleepGoals,
    
        
            remaining: remaining,
            intake: intake,
            target: target,
        
sounds:[sound._id],
users: [user._id]
    }
);
const result = await dairy.save();
res.status(201).json({message: "Dairy Entered By User", dairy: result});

};
exports.getDairy = async(req, res, next) =>
{
const dairy = await Dairy.find();
res.status(200).json({message: "Dairy Fetched", dairy});

};
exports.deleteDairy = async(req, res, next) =>
{
    const dairyId = req.params.dairyId;
    Dairy.findById(dairyId).
    then(dairy =>
        {
            if(!dairy)
            {
                const error = new Error("Could not Find Dairy");
                error.statusCode = 404;
                throw error;
            }
            return Dairy.findByIdAndDelete(dairyId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Delete Dairy"});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};
exports.UpdateDairy = async(req, res, next) =>
{
const dairyId = req.params.dairyId;
const calendarDate = req.body.calendarDate;
const moodRate = req.body.moodRate;
const reminders = req.body.reminders;
const deepSleep = req.body.deepSleep;
const lightSleep = req.body.lightSleep;
const bedtime = req.body.bedtime;
const wakeuptime = req.body.wakeuptime;
const sleepGoals = req.body.sleepGoals;
const remaining = req.body.remaining;
const intake = req.body.intake;
const target = req.body.target;
const soundId = req.body.soundId;
const userId = req.body.userId;
const user = await User.findById(userId);
const sound = await Sounds.findById(soundId);
Dairy.findById(dairyId).then(dairy =>
    {
        if(!dairy)
        {
const error = new Error("Could Not Find Entry of Dairy");
error.statusCode=404;
throw error;
        }
dairy.calendarDate = calendarDate;
dairy.moodRate=moodRate;
dairy.reminders = reminders;
dairy.deepSleep = deepSleep;
dairy.lightSleep=lightSleep;
dairy.bedtime = bedtime;
dairy.wakeuptime = wakeuptime;
dairy.sleepGoals=sleepGoals;
dairy.remaining =remaining;
dairy.intake = intake;
dairy.target = target;
dairy.sounds = [sound._id];
dairy.users = [user._id];
return dairy.save();
    }).then(result =>
        {
            res.status(200).json({message: "Dairy Updated", dairy: result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });

};
exports.getOneDairy = async(req, res, next ) =>
{
    const dairyId = req.params.dairyId;
const result = await Dairy.findById(dairyId);
res.status(200).json({message: "Fetched One", result});
};