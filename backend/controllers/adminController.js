const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Course = require('../models/Course');
const Notice = require('../models/Notice');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const { FeeStructure } = require('../models/Finances');

// @desc    Get all students
// @route   GET /api/admin/students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({}).populate('userId', 'name email');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create student
// @route   POST /api/admin/students
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all faculty
// @route   GET /api/admin/faculty
const getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find({}).populate('userId', 'name email');
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create faculty
// @route   POST /api/admin/faculty
const createFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.create(req.body);
        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all courses
// @route   GET /api/admin/courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create course
// @route   POST /api/admin/courses
const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all notices
// @route   GET /api/admin/notices
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find({}).populate('postedBy', 'name');
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create notice
// @route   POST /api/admin/notices
const createNotice = async (req, res) => {
    try {
        const notice = await Notice.create(req.body);
        res.status(201).json(notice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Operations ---

// @desc    Get attendance reports
// @route   GET /api/admin/reports/attendance
const getAttendanceReports = async (req, res) => {
    try {
        const reports = await Attendance.find({}).populate('studentId', 'firstName lastName');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create fee structure
// @route   POST /api/admin/fees/structure
const createFeeStructure = async (req, res) => {
    try {
        const structure = await FeeStructure.create(req.body);
        res.status(201).json(structure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get exam schedule
// @route   GET /api/admin/exams
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create exam
// @route   POST /api/admin/exams
const createExam = async (req, res) => {
    try {
        const exam = await Exam.create(req.body);
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
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
};
