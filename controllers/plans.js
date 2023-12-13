const Plans=require('../models/plans');
const User = require('../models/user');
const filehelper = require('../util/file');
exports.getAddPlans = async (req, res, next) =>
{
    const planName = req.body.planName;
    const planDescription = req.body.planDescription;
    const planDuration = req.body.planDuration;
    const WeeklyDays = req.body.WeeklyDays;
    const WeeklyGoals = req.body.WeeklyGoals;
    const planImageUrl = req.file.path.replace("\\","/");
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const plans = new Plans({
        planName: planName,
        planDescription: planDescription,
        planDuration: planDuration,
        WeeklyDays: WeeklyDays,
        WeeklyGoals: WeeklyGoals,
        planImageUrl: planImageUrl,
        users: [user._id]
    });
    const result = await plans.save();
    res.status(200).json({message: "Plans Added", result});

};
exports.getPlans = async(req, res, next) =>
{
    const results = await Plans.find();
    res.status(200).json({message: "Plans Fetched", results});
};
exports.getPlansUpdate = async(req, res, next) =>
{
    const planId = req.params.planId;
    const planName = req.body.planName;
    const planDescription = req.body.planDescription;
    const planDuration = req.body.planDuration;
    const WeeklyDays = req.body.WeeklyDays;
    const WeeklyGoals = req.body.WeeklyGoals;
    const image = req.file.path.replace("\\","/");
    const userId = req.body.userId;
    const user = await User.findById(userId);
    Plans.findById(planId).then(plan => 
        {
            if(!plan)
            {
                const error = new Error("Plan Not Found");
                error.statusCode = 404;
                throw error;
            }
            plan.planName=planName;
            plan.planDescription=planDescription;
            plan.planDuration=planDuration;
            plan.WeeklyDays=WeeklyDays;
            plan.WeeklyGoals=WeeklyGoals;
            plan.users = [user._id];
            if(image)
            {
                filehelper.deletefile(plan.planImageUrl);
                plan.planImageUrl = image;
            }
            return plan.save();
        }).then(result =>
            {
                res.status(200).json({message: "Plan Updated", result});

            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};
exports.deletePlans = async(req, res, next) =>
{
    const planId = req.params.planId;
    Plans.findById(planId).then(Plan => 
        {
            if(!Plan)
            {
                const error = new Error("Plans Not Found");
                error.statusCode = 404;
                throw error;
            }
            filehelper.deletefile(Plan.planImageUrl);
            return Plans.findByIdAndDelete(planId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Plans Deleted", result});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 505;
                    }
                    next(err);

                });

};
