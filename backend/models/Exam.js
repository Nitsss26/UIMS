const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['internal', 'external', 'practical', 'viva'],
        required: true,
    },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    subjectId: { type: String, required: true },
    maxMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    room: { type: String },
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        default: 'scheduled',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Exam', examSchema);
