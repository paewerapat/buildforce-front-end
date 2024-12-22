import mongoose, { Schema } from 'mongoose';

const applicantSchema = new Schema({
    candidate: { type: mongoose.Types.ObjectId, ref: 'Candidate' },
    employer: { type: mongoose.Types.ObjectId, ref: 'Employer' },
    job: { type: mongoose.Types.ObjectId, ref: 'Job' },
    status: String,
}, {
    timestamps: true
});

export const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', applicantSchema);