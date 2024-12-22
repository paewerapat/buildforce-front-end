import mongoose, { Schema } from 'mongoose';

const candidateSchema = new Schema({
    avatar: String,
    fullName: String,
    jobPosition: String,
    phone: String,
    email: String,
    expectedSalary: Number,
    experience: Number,
    age: Number,
    qualification: String,
    languages: Array,
    specialisms: Array,
    description: String,
    social: {
        facebook: String,
        twitter: String,
        linkedin: String,
    },
    contact: {
        country: String,
        city: String,
        address: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cv: {
        name: String,
        url: String,
    },
    shortlisted: {
        jobs: [{
            type: mongoose.Types.ObjectId,
            ref: 'Job',
        }],
        employers: [{
            type: mongoose.Types.ObjectId,
            ref: 'Employer',
        }]
    },
}, {
    timestamps: true
});

export const Candidate = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);