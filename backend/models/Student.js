const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    enrollmentNo: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    photo: {
        type: String,
    },
    course: {
        type: String,
    },
    branch: {
        type: String,
    },
    semester: {
        type: Number,
    },
    year: {
        type: Number,
    },
    batch: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
    parentPhone: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    category: {
        type: String,
        enum: ['general', 'obc', 'sc', 'st'],
    },
    admissionDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
