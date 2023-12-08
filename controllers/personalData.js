const Personal = require('../models/peronsalData');
const User = require('../models/user');
const filehelper = require('../util/file');
exports.personalAdd = async (req, res, next) =>
{
    const imageUrl = req.file.path.replace("\\","/");
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dateofbirth = req.body.dateofbirth;
    const weight=req.body.weight;
    const height = req.body.height;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const personals = new Personal(
        {
            imageUrl: imageUrl,
            firstname: firstname,
            lastname: lastname,
            dateofbirth: dateofbirth,
            weight: weight,
            height: height,
            users: [user._id]
        });
        const result = await personals.save();
res.status(200).json({message: "Personal Data Created", result});
};
exports.getPersonalData = async (req, res, next) =>
{
const results = await Personal.find();
res.status(200).json({message: "Fetch Personal Data", results});
};
exports.personalUpdate = async (req, res, next) =>
{
    const personalId = req.params.personalId;
    const image = req.file.path.replace("\\","/");
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dateofbirth = req.body.dateofbirth;
    const weight = req.body.weight;
    const height = req.body.height;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    Personal.findById(personalId).then(personal =>
        {
            if(!personal)
            {
                const error = new Error("Could not find Personal");
                error.statusCode=404;
                throw error;
            }
personal.firstname = firstname;
personal.lastname = lastname;
personal.dateofbirth=dateofbirth;
personal.weight = weight;
personal.height = height;
personal.users = [user._id];
if(image)
    {
        filehelper.deletefile(personal.imageUrl);
        personal.imageUrl = image;
    }
return personal.save();
        }).then(result =>
        {
            res.status(200).json({message: "Personal Post Update", result});
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
exports.deletePersonalData = async (req, res, next) =>
{
    const personalId = req.params.personalId;
    Personal.findById(personalId).then(personal =>
        {
            if(!personal)
            {
                const error = new Error("Could not Find Data");
                error.statusCode=404;
                throw error;
            }
       filehelper.deletefile(personal.imageUrl);     
return Personal.findByIdAndDelete(personalId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: "Deleted", result});
               
            }).catch(err =>
                {
                    if(!err.statusCode)
                {
                    err.statusCode=505;
                }
                next(err);
                });
};