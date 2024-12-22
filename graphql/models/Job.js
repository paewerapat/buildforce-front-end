import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema({
    jobTitle: String,
    description: String,
    specialisms: Array,
    workplaceModes: String,
    jobPosition: String,
    employmentType: String,
    salary: Number,
    experience: Number,
    qualification: String,
    expiredDate: Date,
    employer: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Employer'
    },
    applied: {
        type: Number,
        default: 0
    },
    contact: {
        country: String,
        city: String,
        address: String,
    },
    display: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);