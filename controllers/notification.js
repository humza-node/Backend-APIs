const Notification = require('../models/notification');
const User = require('../models/user');
const Plan = require('../models/plans');
exports.getAddNotify = async(req, res, next) =>
{
    const notifymessage = req.body.notifymessage;
    const notifyDuration = req.body.notifyDuration;
    const planId = req.body.planId;
    const userId = req.body.userId;
    const plan = await Plan.findById(planId);
    const user = await User.findById(userId);
    const notify = new Notification({

notifymessage: notifymessage,
notifyDuration: notifyDuration,
plans: [plan._id],
users: [user._id],
    });
    const results= await notify.save();
    res.status(200).json({message: "Notification Created", results});
};
exports.getUpdate = async(req, res, next) =>
{
    const notifyId = req.params.notifyId;
    const notifymessage = req.body.notifymessage;
    const notifyDuration = req.body.notifyDuration;
    const planId = req.body.planId;
    const userId = req.body.userId;
    const plans = await Plan.findById(planId);
    const users = await User.findById(userId);
    Notification.findById(notifyId).then(notific =>
        {
            if(!notific)
            {
                const error = new Error("Notification Not Found");
                error.statusCode = 404;
                throw error;
            }
            notific.notifymessage = notifymessage;
            notific.notifyDuration = notifyDuration;
            notific.plans = [plans._id];
            notific.users = [users._id];
            return notific.save();
        }).then(results =>
            {
          res.status(200).json({message: "Notification", results});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                })
        };
exports.deleteNotfication = async (req, res, next) =>
{
    const notifyId = req.params.notifyId;
    Notification.findById(notifyId).then(
        notif =>
        {
            if(!notif)
            {
                const error = new Error("Could not Find Notificaton");
                error.statusCode=404;
                throw error;
            }
        return Notification.findByIdAndDelete(notifyId);
        }
    ).then(results =>
        {
            res.status(200).json({message: "Deleted Notification", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.getNotification = async(req, res, next) =>
{
    const notifications  = await Notification.find();
    res.status(200).json({message: "Fetch Notification", notifications});
};