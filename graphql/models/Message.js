import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Types.ObjectId, ref: 'User' },
    userType: {
        type: String,
        require: true,
        enum: ['Candidate', 'Employer']
    },
    text: String,
    isRead: { type: Boolean, default: false},
    dateTime: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
