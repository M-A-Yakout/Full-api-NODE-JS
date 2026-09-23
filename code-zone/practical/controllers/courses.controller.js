const { validationResult } = require("express-validator")
let { course } = require("../data/courses")

const Course = require('../models/course.model')
const { json } = require("body-parser")

const httpStatusText = require('../utils/httpsStatusText.js')
const asyncWrapper = require("../middlewares/asyncWrapper.js")

const appError = require('../utils/appError.js')

const getAllCourses = async (req, res) => {
    //get all courses from DB using Course model 

    const query = req.query
    console.log(query)
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit // http://...../api/course?limit=2&page=5
    const course = await Course.find({}, { '__v': false }).limit(limit).skip(skip)

    res.json({ status: httpStatusText.SUCCESS, data: { course } })
}

const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
        // const courseid = +req.params.courseid
        // const courses = course.find((course) => course.id == courseid)
        const getCourses = await Course.findById(req.params.courseid)
        if (!getCourses) {
            const error = new Error();
            error.message = 'not found course'
            error.statusCode = 404;
            return next(error)
            // return res.status(404).json({ status: httpStatusText.FAIL, data: { course: 'course not found' } })
        }
        return res.json({ status: httpStatusText.SUCCESS, data: getCourses })
        //     } catch (err) {
        //        try {
        //            return res.status(400).json({ status: httpStatusText.ERROR, data: { course: null }, message: err.message, code: 400 })
        //        }

    })

const createCourse = async (req, res, next) => {

    console.log(req.body)

    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
        const error = appError.create('invalid course', 400, httpStatusText.FAIL)
        return next(error)
        return res.status(400).json({ status: httpStatusText.FAIL, data: { errors: errors.array() } })
    }
    const newCourse = new Course(req.body);

    await newCourse.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } })
}



const patchCourse = async (req, res) => {
    const courseid = req.params.id
    // let courses = course.find((course) => course.id == courseid)

    try {
        let updatedCourse = await Course.findByIdAndUpdate(courseid, { $set: { ...req.body, } }, { new: true, runValidators: true }) //  According to route 
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
    } catch (err) {
        res.status(400).json({ status: httpStatusText.ERROR, data: { course: null, message: err.message } })
    }

    // let courses = await Model.findById(req.params.id)
    // courses = { ...courses, ...req.body }

}

const deleteCourse = async (req, res) => {

    try {

        const courseid = req.params.deleteId

        const deleteDatabase = await Course.findByIdAndDelete(courseid)
        if (!deleteDatabase) {
            return res.status(404).json({ status: httpStatusText.FAIL, data: { course: null, message: 'course not found' } })
        }

        res.status(200).json({ status: httpStatusText.SUCCESS, data: null })
    } catch (err) {
        res.status(400).json({ status: httpStatusText.FAIL, data: { course: null, message: err.message } })
    }
}

module.exports = {
    getAllCourses, getSingleCourse, createCourse, patchCourse, deleteCourse
}