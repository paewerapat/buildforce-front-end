import mongoose, { Schema } from 'mongoose';

const resumeSchema = new Schema({
    candidate: {
        type: mongoose.Types.ObjectId,
        ref: 'Candidate'
    },
    cv: {
        name: String,
        url: String,
    },
    description: String,
    education: [{
        academicFields: String, 
        college: String, 
        educationYear: String, 
        educationDescription: String,
        id: String,
    }],
    experience: [{
        jobPosition: String, 
        companyName: String, 
        experienceYear: String, 
        experienceDescription: String,
        id: String,
    }],
    portfolio: {
        name: String,
        url: String,
    },
    awards: [{
        awardTitle: String,
        awardProject: String,
        awardYear: String, 
        awardDescription: String,
        id: String,
    }],
    specialisms: Array,
}, {
    timestamps: true
});

export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);