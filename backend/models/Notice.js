const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['academic', 'examination', 'events', 'holiday', 'general'],
        default: 'general',
    },
    priority: {
        type: String,
        enum: ['urgent', 'high', 'normal', 'low'],
        default: 'normal',
    },
    targetAudience: [{
        type: String,
        enum: ['all', 'students', 'faculty', 'admin'],
    }],
    departments: [{ type: String }],
    publishDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    attachments: [{
        name: String,
        url: String,
        type: String,
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Notice', noticeSchema);
