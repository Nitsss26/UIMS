const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shortName: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    logo: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    website: {
        type: String,
    },
    affiliatedTo: {
        type: String,
    },
    establishedYear: {
        type: Number,
    },
    principalName: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    subscriptionPlan: {
        type: String,
        enum: ['basic', 'standard', 'premium'],
        default: 'basic',
    },
    subscriptionExpiry: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('University', universitySchema);
