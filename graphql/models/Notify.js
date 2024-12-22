import mongoose, { Schema } from 'mongoose';

const notifySchema = new Schema({
    user: { type: mongoose.Types.ObjectId, refPath: 'userType' },
    recipients: [{ type: mongoose.Types.ObjectId, refPath: 'recipientsType' }],
    userType: {
        type: String,
        require: true,
        enum: ['Candidate', 'Employer']
    },
    recipientsType: {
        type: String,
        require: true,
        enum: ['Candidate', 'Employer']
    },
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: { type: Boolean, default: false },
}, {
    timestamps: true
});

export const Notify = mongoose.models.Notify || mongoose.model('Notify', notifySchema);