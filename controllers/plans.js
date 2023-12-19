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
    const image = req.file.path.replace("\\","/");
    const plans = new Plans({
        planName: planName,
        planDescription: planDescription,
        planDuration: planDuration,
        WeeklyDays: WeeklyDays,
        WeeklyGoals: WeeklyGoals,
        planImageUrl: image
 
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
    const baseUrl = 'https://ultramarine-colt-wrap.cyclic.app';
    const absoluteImageUrl = `${baseUrl}/${image}`;
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
            if(image)
            {
                filehelper.deletefile(plan.planImageUrl);
                plan.planImageUrl = absoluteImageUrl;
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
exports.postPlan = async(req, res, next) =>
{
    const planId = req.body.planId;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const plans = await Plans.findById(planId);
    const results = await user.addToPlans(plans);
    res.status(200).json({message: "Added Plans", results});
};
exports.deletePlansCart = async (req, res, next) => {
    try {
      const planId = req.body.planId;
      const userId = req.body.userId;
  
      const user = await User.findById(userId);
      const plan = await Plans.findById(planId);
  
      if (!user || !plan) {
        return res.status(404).json({ error: 'User or Plan not found' });
      }
  
      user.removeFromPlans(planId).then((updatedUser) => {
        console.log('Removed Plan');
        console.log(updatedUser);
        res.status(200).json({ message: 'Plan removed successfully' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };