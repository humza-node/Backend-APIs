const Trainer = require('../models/trainer');
const Workout = require('../models/workout');
const Plan = require('../models/plans');
const filehelper = require('../util/file');
exports.getAddTrainer = async(req, res, next) =>
{
    const trainerName = req.body.trainerName;
    const trainerDescription = req.body.trainerDescription;
    const trainerExperience = req.body.trainerExperience;
    const trainerRating = req.body.trainerRating;
    const image = req.file.path.replace("\\","/");
    const baseUrl = 'https://orange-bonobo-tutu.cyclic.app';
    const absoluteImageUrl = `${baseUrl}/${image}`;
    const workoutId = req.body.workoutId;
    const planId = req.body.planId;
    const works = await Workout.findById(workoutId);
    const plan = await Plan.findById(planId);
    const trainer = new Trainer({
        trainerName: trainerName,
        trainerDescription: trainerDescription,
        trainerExperience: trainerExperience,
        trainerRating: trainerRating,
        trainImage: absoluteImageUrl,
        plans: [plan._id],
        workouts: [works._id]
    });
    const results = await trainer.save();
    res.status(200).json({message: "Trainer Save", results});
};
exports.getTrainers = async(req, res, next) =>
{
    const results = await Trainer.find();
    res.status(200).json({message: "Fetch Trainers", results});
};
exports.updateTrainer = async (req, res, next) =>
{
const trainerId = req.params.trainerId;
const trainerName = req.body.trainerName;
const trainerDescription = req.body.trainerDescription;
const trainerRating = req.body.trainerRating;
const image = req.file.path.replace("\\","/");
const workoutId = req.body.workoutId;
const planId = req.body.planId;
const workout = await Workout.findById(workoutId);
const plans = await Plan.findById(planId);
Trainer.findById(trainerId).then(trains =>
    {
        if(!trains)
        {
            const error = new Error("Trainers Not Found");
            error.status = 500;
            throw error;
        }
        trains.trainerName = trainerName;
        trains.trainerDescription = trainerDescription;
        trains.trainerRating = trainerRating;
        trains.workouts = [workout._id];
        trains.plans = [plans._id];
if(image)
{
   filehelper.deletefile(trains.trainImage);
    trains.trainImage = image;
}
        return trains.save();
    }).then(results =>
        {
            console.log(results);
            res.status(200).json({message: "Trainer info Update", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.DeleteTrainer = async(req, res, next) =>
{
    const trainerId = req.params.trainerId;
    Trainer.findById(trainerId).then(trains =>
        {
            if(!trains)
            {
                const error = new Error("Trainer Not Found");
                error.statusCode = 404;
                throw error;
            }
        filehelper.deletefile(trains.trainImage);
        return Trainer.findByIdAndDelete(trainerId);
}).then(results =>
    {
        console.log(results);
        res.status(200).json({message: "Deleted Trainer"});
    }).catch(err =>
        {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        });
}