const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    // Simple check for now, can be expanded with JWT later
    // For now, we'll assume a dummy header or just let it pass for development as requested
    // "dont try to connect with the frontend as of now" - following this, but setting up structure.
    next();
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'university_admin' || req.user.role === 'super_admin') {
        next();
    } else {
        // res.status(401).json({ message: 'Not authorized as an admin' });
        next(); // Pass for now
    }
};

module.exports = { protect, admin };
