const Object = require('../models/objectsChecks');
exports.addObject = async (req, res, next ) =>
{
const objectname = req.body.objectname;
const weight = req.body.weight;
const height = req.body.height;
const email = req.body.email;
const password = req.body.password;
const username = req.body.username;
const objects = new Object(
    {
        objectname: objectname,
        persons:
            {
            weight: weight,
            height: height
            },
        data:
            {
                email:email,
                password: password,
                username: username
            }
        
    }
);
const results = await objects.save();
res.status(200).json({message: "Fetched", results});
};
exports.updateObject = async (req, res, next) =>
{
    const objectId = req.params.objectId;
    const objectname = req.body.objectname;
    const weight = req.body.weight;
    const height = req.body.height;
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    Object.findById(objectId).then(objects =>
    {
        if(!objects)
        {
            const error = new Error('Object not Found');
            error.statusCode = 404;
            throw error;
        }
        objects.objectname=objectname;
          objects.persons.weight=weight;
          objects.persons.height=height;
        objects.data.email=email;
        objects.data.password=password;
        objects.data.username=username;
        return objects.save();
    }
    ).then(results =>
        {
            console.log(results);
            res.status(200).json({message: "Objects Update", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 404;
                }
            });
};
exports.getObjects = async(req, res, next) =>
{
    const results = await Object.find();
    res.status(200).json({message: "Objects Founded", results});
};