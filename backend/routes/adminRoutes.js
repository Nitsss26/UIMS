const express = require('express');
const router = express.Router();
const {
    getStudents,
    createStudent,
    getFaculty,
    createFaculty,
    getCourses,
    createCourse,
    getNotices,
    createNotice,
    getAttendanceReports,
    createFeeStructure,
    getExams,
    createExam,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/students')
    .get(protect, admin, getStudents)
    .post(protect, admin, createStudent);

router.route('/faculty')
    .get(protect, admin, getFaculty)
    .post(protect, admin, createFaculty);

router.route('/courses')
    .get(protect, admin, getCourses)
    .post(protect, admin, createCourse);

router.route('/notices')
    .get(protect, admin, getNotices)
    .post(protect, admin, createNotice);

router.route('/fees/structure')
    .post(protect, admin, createFeeStructure);

router.route('/exams')
    .get(protect, admin, getExams)
    .post(protect, admin, createExam);

router.route('/reports/attendance')
    .get(protect, admin, getAttendanceReports);

module.exports = router;
