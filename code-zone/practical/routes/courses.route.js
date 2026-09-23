
const express = require('express')
const coursesController = require('../controllers/courses.controller')
const { vaildatSchema } = require('../middlewares/validataSchema')
const verifyToken = require('../middlewares/verifyToken')
const userRole = require('../utils/userRoles')
const allowedTo = require('../middlewares/allowedTo')

const router = express.Router()

//!  get all course API
//route => ressource
router.get('/', coursesController.getAllCourses// (req, res) => {
    // res.json(course);
    //}
)

// app.get('/api/course/3', (req, res) => {
//     const courses = course.find((course) => course.id == 3);
//     res.json(courses)
// })
//!  get SINGLE course API
router.get('/:courseid', coursesController.getSingleCourse// (req, res) => {
    // console.log(req.params)
    // const courseid = +req.params.courseid
    // const courses = course.find((course) => course.id == courseid);
    // if (!courses) {
    //     return res.status(404).json({ msg: "course not found" })
    // }
    // res.json(courses)
    //}
)


//!  create  course API
router.post('/', vaildatSchema(), verifyToken,allowedTo(userRole.ADMIN,userRole.USER,userRole.MANAGER), coursesController.createCourse
    // (req, res) => {
    //     console.log(req.body)

    //     const errors = validationResult(req)
    //     console.log(errors)

    //     if (!errors.isEmpty()) {
    //         return res.status(400).json(errors.array())
    //     }
    // if (!req.body.title || req.body.price <= 0) {
    //     return res.status(400).json({ msg: "not fill data" })
    // }
    // course.push({ id: course.length + 1, ...req.body })
    // res.status(201).json(course)
    // }
)



//! api patch update part

router.patch('/:id', coursesController.patchCourse // (req, res) => {
    // const courseid = +req.params.id
    // let courses = course.find((course) => course.id == courseid)

    // courses = { ...courses, ...req.body } // اخر قيمة هي بتكسب

    // res.status(200).json(courses);
    //}
)

//! api delete course api
router.delete('/:deleteId', verifyToken, allowedTo(userRole.ADMIN, userRole.MANAGER), coursesController.deleteCourse// (req, res) => {
    // const courseid = +req.params.deleteId // ده بجيب ايددي كورس عشان تتمسح في سطر التاني

    // course = course.filter((course) => course.id !== courseid)

    // res.status(200).json({ msg: 'Course have been delete' })
    //}
)

module.exports = router