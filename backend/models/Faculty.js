const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
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
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
    },
    experience: {
        type: Number,
    },
    specialization: {
        type: String,
    },
    subjects: [{
        type: String,
    }],
    joiningDate: {
        type: Date,
    },
    salary: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on_leave'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Faculty', facultySchema);
