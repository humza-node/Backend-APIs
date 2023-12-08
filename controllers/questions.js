const Question = require('../models/onboard');
const Student = require('../models/students');
exports.getAdd = async (req, res, next) =>
{
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const gender = req.body.gender;
const age = req.body.age;
const weight = req.body.weight;
const fitnesslevel = req.body.fitnesslevel;
const focusarea = req.body.focusarea;
const InjuryHealthIssue = req.body.InjuryHealthIssue;
const exerciseEquipments = req.body.exerciseEquipments;
const dietaryRequirements = req.body.dietaryRequirements;
const dieseases = req.body.dieseases;
const exerciseDays = req.body.exerciseDays;
const studentId = req.body.studentId;
const student = await Student.findById(studentId);
const questions = new Question({
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    age: age,
    weight: weight,
    fitnesslevel: fitnesslevel,
    focusarea: focusarea,
    InjuryHealthIssue: InjuryHealthIssue,
    exerciseEquipments: exerciseEquipments,
    dietaryRequirements: dietaryRequirements,
    dieseases: dieseases,
    exerciseDays: exerciseDays,
students: [student._id]
});
const result = await questions.save();
res.status(201).json({
    message: "Questions Submitted",
    questions: result
});

};

exports.getQuestions = async(req, res, next) =>
{
const Questions =await Question.find();
res.status(200).json({message: "Fetch Question And Questions", Questions});
};
exports.updateQuestion = async(req, res, next) =>
{
    const questionId = req.params.questionId;
    const firstname = req.body.firstname;
const lastname = req.body.lastname;
const gender = req.body.gender;
const age = req.body.age;
const weight = req.body.weight;
const fitnesslevel = req.body.fitnesslevel;
const focusarea = req.body.focusarea;
const InjuryHealthIssue = req.body.InjuryHealthIssue;
const exerciseEquipments = req.body.exerciseEquipments;
const dietaryRequirements = req.body.dietaryRequirements;
const dieseases = req.body.dieseases;
const exerciseDays = req.body.exerciseDays;
const studentId = req.body.studentId;
const student = await Student.findById(studentId);
Question.findById(questionId)
.then(question =>
    {
        if(!question)
        {
            const error = new Error("Question not Found");
            error.statusCode=404;
            throw error;
        }
        question.firstname = firstname;
        question.lastname = lastname;
        question.gender = gender;
        question.age = age;
        question.weight = weight;
        question.fitnesslevel = fitnesslevel;
        question.focusarea = focusarea;
        question.InjuryHealthIssue = InjuryHealthIssue;
        question.exerciseEquipments = exerciseEquipments;
        question.dietaryRequirements = dietaryRequirements;
        question.dieseases = dieseases;
        question.exerciseDays = exerciseDays;
        question.students = [student._id]
        return question.save();
    }).then(result =>
        {
            res.status(200).json({message: "Post updated", question: result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            }
            );
};
exports.deleteQuestion = async (req, res, next) =>
{
    const questionId = req.params.questionId;
    Question.findById(questionId).then(question =>
        {
            if(!question)
            {
                const error = new Error("Could not Find Questions");
                error.statusCode=404;
                throw error;
            }
            return Question.findByIdAndDelete(questionId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Question Deleted", result});
            }).
            catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};
exports.getQuestion = async (req, res, next) =>
{
    const questionId = req.params.questionId;
    Question.findById(questionId).
    then(student =>
       {
        if(!student)
        {
            const error = new Error("Not Found");
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({message: "Fetch Question", student});
       }
        ).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;

                }
                next(err);
            });
};