const Course = require('../models/course');
const User = require('../models/user');
const Student = require('../models/students');
exports.getAddCourse = async (req, res, next) =>
{
    const coursetitle = req.body.coursetitle;
    const coursedescription = req.body.coursedescription;
    const userId = req.body.userId;
    const studentId = req.body.studentId;
   const user = await User.findById(userId);
   const student = await Student.findById(studentId);
    const course = new Course(
        {
            coursetitle: coursetitle,
            coursedescription: coursedescription,
            users: [user._id],
            students: [student._id]
        }
    );
    const courses = await course.save();
    res.status(201).json({message: "Course Created SuccessFully", courses});

}
exports.getCourses = async (req, res, next) =>
{
const courses = await Course.find();
res.status(200).json({message: "Fetched Courses", courses});
};

exports.updateCourse = async(req, res, next) =>
{
const courseId = req.params.courseId;
const coursetitle = req.body.coursetitle;
const coursedescription = req.body.coursedescription;
const userId = req.body.userId;
const studentId = req.body.studentId;
const user = await User.findByIdAndUpdate(userId);
const student = await Student.findByIdAndUpdate(studentId);

Course.findById(courseId)
.then(course =>
    {
       if(!course)
       {
        const error = new Error("Courses not Found");
        error.statusCode = 404;
        throw error;
       } 
       course.coursetitle = coursetitle;
       course.coursedescription = coursedescription;
       course.users = [user._id];
       course.students = [student._id];
       return course.save();
    }).then(result =>
        {
            res.status(200).json({message: "Post Updated!", course: result});
        })
        .catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.deleteCourse = async(req, res, next) =>
{
const courseId = req.params.courseId;
Course.findById(courseId).then(course =>
    {
        if(!course)
        {
            const error = new Error("Could not Find Courses");
            error.statusCode =404;
            throw error;
        }
        return Course.findByIdAndDelete(courseId);
    }).then(result =>
        {
            console.log(result);
            res.status(200).json({message: "Course Deleted", result});  
        })
        .catch(err =>
          {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
          });

};