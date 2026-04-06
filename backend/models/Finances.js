const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
    course: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    tuitionFee: { type: Number, default: 0 },
    labFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    sportsFee: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    examinationFee: { type: Number, default: 0 },
    transportFee: { type: Number, default: 0 },
    hostelFee: { type: Number, default: 0 },
    messFee: { type: Number, default: 0 },
    totalFee: { type: Number, required: true },
}, {
    timestamps: true,
});

const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    feeStructureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeStructure',
    },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMode: {
        type: String,
        enum: ['cash', 'cheque', 'online', 'dd'],
        required: true,
    },
    transactionId: { type: String },
    receiptNo: { type: String, required: true, unique: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    status: {
        type: String,
        enum: ['paid', 'pending', 'partial'],
        default: 'paid',
    },
    remarks: { type: String },
}, {
    timestamps: true,
});

module.exports = {
    FeeStructure: mongoose.model('FeeStructure', feeStructureSchema),
    Payment: mongoose.model('Payment', paymentSchema),
};
