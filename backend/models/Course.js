const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    theoryHours: { type: Number },
    practicalHours: { type: Number },
    semester: { type: Number, required: true },
});

const branchSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    subjects: [subjectSchema],
});

const courseSchema = new mongoose.Schema({
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['ug', 'pg', 'diploma'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    branches: [branchSchema],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
module.exports.SubjectSchema = subjectSchema;
module.exports.BranchSchema = branchSchema;
