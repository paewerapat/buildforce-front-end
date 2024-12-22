import mongoose, { Schema } from "mongoose";

const statisticsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        refPath: 'userType'
    },
    refPath: {
        type: String,
        require: true,
        enum: ['Candidate', 'Employer']
    },
    jobs: Number,
    messages: Number,
    applicants: Number,
})

export const Statistics = mongoose.models.Statistics || mongoose.model('Statistics', statisticsSchema)