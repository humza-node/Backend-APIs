const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Student = require('../models/students');

exports.createStudent = async (req, res, next) => {
 
    const name =req.body.name;
    const fname = req.body.fname;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const imageUrl = req.body.imageUrl;

    const student = new Student({
      name: name,
      fname: fname,
      contact: contact,
      gender: gender,
      imageUrl: imageUrl,
    });

    const result = await student.save();                                          

    res.status(201).json({
      message: 'Post Created Successfully',
      student: result,
    });
 
};

exports.getStudents = async (req, res, next) => {
    const students = await Student.find();
    res.status(200).json({
      message: "Fetch Students Successfully",
      students,
    });
};

exports.updateStudents = async (req, res, next) =>
{
    const studentId = req.params.studentId;
    const name = req.body.name;
    const fname = req.body.fname;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const imageUrl = req.body.imageUrl;
    Student.findById(studentId)
    .then(student =>
        {
            if(!student)
            {
                const error = new Error("Could not Find Posts");
                error.statusCode = 404;
                throw error;
            }
            student.name = name;
            student.fname = fname;
            student.contact = contact;
            student.gender = gender;
            student.imageUrl = imageUrl;
            return student.save();
        }).then(result =>
            {
                res.status(200).json({message: 'Post updated!', student: result});
            })
            .catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                });

};


exports.deleteStudent = async (req, res, next) =>
{
    const studentId = req.params.studentId;
    Student.findById(studentId)
    .then(student =>
        {
            if(!student)
            {
                const error = new Error("Could not Find Posts");
                error.statusCode=404;
                throw error;
            }
            return Student.findByIdAndDelete(studentId);
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({message: 'Deleted Post'});
            })
            .catch(err=>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);  
                });

};

exports.getStudent = async (req, res, next) =>
{
    const studentId = req.params.studentId;
Student.findById(studentId)
.then(student =>
    {
        if(!student)
        {
            const error = new Error('Student Not Found');
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({message: 'Fetch Single one', student});
    }).catch(err =>
        {
            if(!err.statusCode)
            {
                err.statusCode=500;
            }
            next(err);
        });

};
exports.studentsform = async (req, res) => {
    res.render('students', { errors: null }); // You can pass any additional data you want to the EJS file
};

