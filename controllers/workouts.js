const Workout = require('../models/workout');
const filehelper = require('../util/file');
exports.AddWorkouts = async(req, res, next) =>
{
    const workout=req.body.workout;
    const workoutdescription = req.body.workoutdescription;
    const workoutCategory = req.body.workoutCategory;
    const image = req.file.path.replace("\\","/");
    const workouts = new Workout(
        {
            workout: workout,
            workoutdescription: workoutdescription,
            workoutCategory: workoutCategory,
            workoutImageUrl: image
        }
    );
    const results = await workouts.save();
    res.status(200).json({message: "Workout Added", results});
};
exports.getWorkouts = async(req, res, next) =>
{
    const results = await Workout.find();
    res.status(200).json({message: "Fetched Workouts", results});
};
exports.updateWorkouts = async(req, res, next) =>
{
const workoutId = req.params.workoutId;
const workout = req.body.workout;
const workoutdescription = req.body.workoutdescription;
const workoutCategory = req.body.workoutCategory;
const image = req.file.path.replace("\\","/");
Workout.findById(workoutId).then(workouts =>
    {
        if(!workouts)
        {
            const error = new Error("Not Founds Workouts");
            error.statusCode = 404;
            throw error;
        }
        workouts.workout = workout;
        workouts.workoutdescription = workoutdescription;
        workouts.workoutCategory=workoutCategory;
        if(image)
        {
            filehelper.deletefile(workouts.workoutImageUrl);
            workouts.workoutImageUrl=image;
        }
        return workouts.save();
    }).then(result =>
        {
            res.status(200).json({message: 'WorkOut Updates', result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.deleteWorkouts = async(req, res, next) =>
{
    const workoutId  = req.params.workoutId;
    Workout.findById(workoutId).then(worksout =>
        {
            if(!worksout)
            {
            const error = new Error("Not Founds");
            error.statusCode = 404;
            throw error;
            }
            filehelper.deletefile(worksout.workoutImageUrl);
            return Workout.findByIdAndDelete(workoutId);
        }).then(results =>
            {
                console.log('Workout Deleted', results);
                res.status(200).json({message: 'Workout Deleted', results});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });

};