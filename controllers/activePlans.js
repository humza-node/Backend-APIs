const ActivePlans = require('../models/active_plans');
const User = require('../models/user');
const Payment = require('../models/Payments');
const Plan = require('../models/plans');
exports.addActivePlans = async (req, res, next) =>
{
const userId = req.body.userId;
const paymentId = req.body.paymentId;
const planId = req.body.planId;
const user = await User.findById(userId);
const payment = await Payment.findById(paymentId);
const plans = await Plan.findById(planId);
const active = new ActivePlans(
    {
        users: [user._id],
        payments: [payment._id],
        plans: [plans._id]
    }
);
const results = await active.save();
res.status(200).json({message: "Active Plans", results});

};
exports.getActivePlans = async(req, res, next) =>
{
    const activePlans = await ActivePlans.find();
    res.status(200).json({message: "Active Plans", activePlans});
};
exports.updateActivePlans = async (req, res, next) =>
{
    const activePlanId = req.params.activePlanId;
    const userId = req.body.userId;
    const paymentId = req.body.paymentId;
    const planId = req.body.planId;
    const user = await User.findById(userId);
    const payment = await Payment.findById(paymentId);
    const plan = await Plan.findById(planId);
    ActivePlans.findById(activePlanId).then(activePlans =>
        {
            if(!activePlans)
            {
                const error = new Error("Active Plans Not Found");
                error.statusCode = 404;
                throw error;
            }
            activePlans.users= [user._id];
            activePlans.payments=[payment._id];
            activePlans.plans= [plan._id];
            const actives = activePlans.save();
            res.status(200).json({message: 'Active Plans Update', actives});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });    
};
exports.deleteActivePlans = async (req, res, next) =>
{
    const activePlanId = req.params.activePlanId;
    ActivePlans.findById(activePlanId).then(plans =>
        {
            if(!plans)
            {
                const error = new Error("Active Plans Not found");
                error.statusCode=404;
                throw error;
            }
            return ActivePlans.findByIdAndDelete(activePlanId);
        }).then(results =>
            {
                console.log(results);
                res.status(200).json({message: "Deleted Successfully"});
            }).catch(err =>
                {
                    if(!err.statusCode)
                {
                    err.statusCode=500;
                } });
                next(err);
};