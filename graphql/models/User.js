import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    type: String,
    name: String,
    avatar: String,
    candidateInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'Candidate',
    },
    employerInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'Employer',
    },
    resetToken: {
        hash: String,
        expiredIn: Number,
    },
    provider: String
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);