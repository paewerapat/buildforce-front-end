import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    text: String,
}, {
    timestamps: true
});

export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);