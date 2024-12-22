import mongoose, { Schema } from 'mongoose';

const employerSchema = new Schema({
    logo: String,
    cover: String,
    companyName: String,
    contactEmail: String,
    phone: String,
    website: String,
    industry: String,
    about: String,
    founded: String,
    companySize: String,
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
    admin: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    shortlisted: {
        applicants: [{
            type: mongoose.Types.ObjectId,
            ref: 'Applicant'
        }],
        candidates: [{
            type: mongoose.Types.ObjectId,
            ref: 'Candidate'
        }]
    }
}, {
    timestamps: true
});

export const Employer = mongoose.models.Employer || mongoose.model('Employer', employerSchema);