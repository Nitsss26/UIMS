const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    marksObtained: { type: Number, required: true },
    grade: { type: String },
    gradePoint: { type: Number },
    status: {
        type: String,
        enum: ['pass', 'fail', 'absent'],
        required: true,
    },
    remarks: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Result', resultSchema);
