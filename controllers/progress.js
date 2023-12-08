const Progress = require('../models/progress');
const User = require('../models/user');
exports.getAddProgress = async (req, res, next) =>
{
const currentDate = req.body.currentDate;
const kcalinfo = req.body.kcalinfo;
const targetKcal = req.body.targetKcal;
const burnKcal = req.body.burnKcal;
const dailyGoals = req.body.dailyGoals;
const waterlevel = req.body.waterlevel;
const runningPoints=req.body.runningPoints;
const heartPoints = req.body.heartPoints;
const sleepProgress = req.body.sleepProgress;
const userId = req.body.userId;
const user = await User.findById(userId);
const progress = new Progress(
    {
        currentDate: currentDate,
        kcalinfo: kcalinfo,
        targetKcal: targetKcal,
        burnKcal: burnKcal,
        dailyGoals: dailyGoals,
        waterlevel: waterlevel,
        runningPoints: runningPoints,
        heartPoints: heartPoints,
        sleepProgress: sleepProgress,
        users: [user._id]  
     });
     const result = await progress.save();
    res.status(200).json({message: "Progress Saved", progress: result});
};
exports.getProgress = async (req, res, next) =>
{
    const results = await Progress.find();
    res.status(200).json({message: "Progress Fetch", results});
};

exports.deleteProgress = async (req, res, next) =>
{
    const progressId = req.params.progressId;
    Progress.findById(progressId).then(progress =>
        {
            if(!progress)
            {
                const error = new Error("The Progress Not Found");
                error.statusCode = 404;
                throw error;
            }
            return Progress.findByIdAndDelete(progressId);
        } ).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Deleted Course", result});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};
exports.updateProgress = async (req, res, next) =>
{
const progressId=req.params.progressId;
const currentDate=req.body.currentDate;
const kcalinfo=req.body.kcalinfo;
const targetKcal=req.body.targetKcal;
const burnKcal=req.body.burnKcal;
const dailyGoals=req.body.dailyGoals;
const waterlevel=req.body.waterlevel;
const runningPoints=req.body.runningPoints;
const heartPoints=req.body.heartPoints;
const sleepProgress = req.body.sleepProgress;
const userId = req.body.userId;
const user = await User.findById(userId);
Progress.findById(progressId).then(progress =>
    {
if(!progress)
{
    const error = new Error("Progress Not Found");
    error.statusCode=404;
    throw error;
}
progress.currentDate = currentDate;
progress.kcalinfo = kcalinfo;
progress.targetKcal = targetKcal;
progress.burnKcal = burnKcal;
progress.dailyGoals=dailyGoals;
progress.waterlevel=waterlevel;
progress.runningPoints=runningPoints;
progress.heartPoints=heartPoints;
progress.sleepProgress = sleepProgress;
progress.users = [user._id];
return progress.save();
}).then(result =>
    {
        res.status(200).json({message: "Post Update", result});
    }).catch(err =>
        {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        });
};

exports.getSingleProgress = async (req, res, next) =>
{
    const progressId = req.params.progressId;
    const result = await Progress.findById(progressId);
    res.status(200).json({message: "Fetch Single Progress", result});
};