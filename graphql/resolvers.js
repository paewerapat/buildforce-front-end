import { GraphQLScalarType } from 'graphql';
import { Candidate } from './models/Candidate.js';
import { Employer } from './models/Employer.js';
import { Job } from './models/Job.js';
import { User } from './models/User.js';
import mongoose from 'mongoose';
import { Resume } from './models/Resume.js';
import { Applicant } from './models/Applicant.js';
import { Notify } from './models/Notify.js';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { applicantFilterByEmployer, filterCandidate, filterEmployer, filterJob } from './filter.js';

const LIMIT_QUERY = process.env.LIMIT_QUERY || 10;

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString()
}

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString();
    },
})


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || LIMIT_QUERY
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

// GraphQL Resolvers
export const resolvers = {
    Date: dateScalar,
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    NotifyType: {
        __resolveType(obj, context, info) {
            if(obj.fullName) return 'Candidate';
            else if(obj.companyName) return 'Employer';
            return null
        }
    },
    Query: {
        users: async () => await User.find({}).populate(['candidateInfo', 'employerInfo']),
        userById: async (parent, args) => await User.findById(args.id).populate(['candidateInfo', 'employerInfo']),
        userByEmailOrUsername: async (parent, args) => {
            const { email } = args;
            if (!email) {
                throw new Error(`User with email/username not found`);
            }
            const user = await User.findOne({$or: [{email: email}, {username: email}] }).populate([{
                    path: 'candidateInfo',
                    populate: {
                        path: 'shortlisted',
                        populate: [
                            {
                                path: 'jobs'
                            }, {
                                path: 'employers'
                            }
                        ]
                    }
                }, {
                    path: 'employerInfo',
                    populate: {
                        path: 'shortlisted',
                        populate: [
                            {
                                path: 'applicants'
                            },
                            {
                                path: 'candidates'
                            }
                        ]
                    }
                }
            ])
            return user;
        },
        userByResetToken: async (parent, args) => {
            const { hash } = args;
            const user = await User.findOne({ $and: [
                { 
                    'resetToken.hash': hash 
                }, 
                {
                    'resetToken.expiredIn': {
                        $gt: Date.now()
                    }
                }
            ]})
            return user;
        },

        candidates: async (parent, args) => {
            const { filter } = args;
            const options = filter?.options ? filterCandidate(args.filter) : {};
            const features = new APIfeatures(Candidate.find(options), args).paginating()
            const candidates = await features.query.sort(`${filter?.sortDate ? filter.sortDate : '-'}createdAt`)
            return candidates;
        },
        candidateById: async (parent, args) => {
            const candidate = await Candidate.findById(args.id).populate([{
                path: 'shortlisted',
                populate: [
                    {
                        path: 'jobs',
                        populate: {
                            path: 'employer'
                        }
                    },
                    {
                        path: 'employers'
                    }
                ]
            }])
            return candidate
        },
        candidateByUser: async (parent, args) => {
            const { user } = args;
            const candidate = await Candidate.findOne({
                user: user
            }).populate(`user`)
            return candidate;
        },

        employers: async (parent, args) => {
            const { filter } = args;
            const options = filter?.options ? filterEmployer(args.filter) : {}
            const features = new APIfeatures(Employer.find(options).populate('admin'), args).paginating()
            const employers = await features.query.sort(`${filter?.sortDate ? filter.sortDate : '-'}createdAt`)
            return employers;
        },
        employerById: async (parent, args) => {
            const employer = await Employer.findById(args.id).populate([{
                path: 'shortlisted',
                populate: [{
                    path: 'applicants',
                    populate: {
                        path: 'candidate'
                    }
                }, {
                    path: 'candidates'
                }],
            }])
            return employer
        },
        employerByUser: async (parent, args) => {
            const { admin } = args;
            const employer = await Employer.findOne({
                admin: { $in: admin }
            }).populate(`admin`)
            return employer;
        },

        resumes: async (parent, args) => await Resume.find(),
        resumeById: async (parent, args) => await Resume.findById(args.id),
        resumeByCandidate: async (parent, args) => {
            const resume = await Resume.findOne({
                candidate: args.candidate
            }).populate('candidate')
            return resume
        },

        jobs: async (parent, args) => {
            const { filter } = args;
            const options = filter?.options ? filterJob(filter) : {}
            const expiredDateOption = { expiredDate: { $gte: new Date(Date.now()) } };
            const features = new APIfeatures(Job.find(
                options
            ).sort(`${filter?.sortDate ? filter.sortDate : '-'}createdAt`), args).paginating()
            const jobs = await features.query.populate(["employer"])
            return jobs;
        },
        jobById: async (parent, args) => await Job.findById(args.id).populate([{
            path: 'employer',
            populate: {
                path: 'admin'
            }
        }]),
        jobByEmployer: async (parent, args) => {
            const features = new APIfeatures(Job.find({ employer: args.employer }), args).paginating()
            const jobs = await features.query.sort(`${args?.filter ? args.filter : '-'}createdAt`).populate('employer')
            return jobs
        },
        allJob: async (parent, args) => await Job.find(),
        allJobByEmployer: async (parent, args) => await Job.find({ employer: args.id }),
        allJobPositionByCandidate: async (parent, args) => await Job.find({ jobPosition: args.position }),

        applicants: async () => await Applicant.find().populate(['candidate', 'employer', 'job']),
        applicantByCandidate: async (parent, args) => {
            const { id } = args;
            const features = new APIfeatures(Applicant.find({
                candidate: id
            }).sort(`${args?.filter ? args.filter : '-'}createdAt`), args).paginating()
            const applicant = await features.query.populate(['job', 'employer', 'candidate'])
            return applicant;
        },
        applicantByEmployer: async (parent, args) => {
            const { id } = args;
            const options = args?.filter ? applicantFilterByEmployer(args.filter) : {}
            const features = new APIfeatures(Applicant.find({
                employer: id, ...options
            }), args).paginating()
            const applicant = await features.query.sort('-createdAt').populate([{
                path: 'job'
            }, {
                path: 'candidate'
            }, {
                path: 'employer',
                populate: {
                    path: 'shortlisted'
                }
            }])
            return applicant
        },
        applicantByJob: async (parent, args) => {
            const { id } = args;
            const features = new APIfeatures(Applicant.find({job: id}), args).paginating()
            const applicant = await features.query.sort('-createdAt').populate(['candidate', 'employer', 'job'])
            return applicant;
        },
        applicantByJobAndCandidate: async (parent, args) => {
            const { job, candidate } = args;
            const features = new APIfeatures(Applicant.findOne({
                job: job, candidate: candidate
            }), args).paginating()
            const applicant = await features.query.sort('-createdAt').populate(['candidate'])
            return applicant;
        },
        applicantById: async (parent, args) => await Applicant.findById(args.id).populate(['candidate', 'employer', 'job']),
        allApplicantByEmployer: async (parent, args) => await Applicant.find({ employer: args.id }),
        allApplicantByCandidate: async (parent, args) => await Applicant.find({ candidate: args.id }),

        notifies: async (parent, args) => await Notify.find(),
        notifyIsReadByRecipient: async (parent, args) => await Notify.find({
            recipients: { $in: args.id }
        }).populate(['user', 'recipients']),
        notifyByRecipient: async (parent, args) => {
            const features = new APIfeatures(Notify.find({
                recipients: { $in: args.id }
            }).populate(['user', 'recipients']), args).paginating()
            const notify = await features.query.sort({isRead: 1, createdAt: -1})
            return notify;
        },
    },

    Mutation: {

        createUser: async (parent, args) => {
            const { email, password, type, avatar, name, provider } = args;
            const newUser = new User({
                email,
                password,
                type,
                avatar,
                name,
                provider,
            })
            await newUser.save();
            return newUser;
        },
        updateUserCandidateInfo: async (parent, args) => {
            const { id, candidateInfo } = args;
            const updateUser = await User.findByIdAndUpdate(id, {
                candidateInfo
            })
            return updateUser;
        },
        updateUserEmployerInfo: async (parent, args) => {
            const { id, employerInfo } = args;
            const updateUser = await User.findByIdAndUpdate(id, {
                employerInfo: employerInfo
            })
            return updateUser;
        },
        updatePassword: async (parent, args) => {
            const updateUser = await User.findByIdAndUpdate(args.id, {
                password: args.password
            })
            return updateUser
        },
        updateUserToken: async (parent, args) => {
            const { hash, expiredIn } = args.resetToken
            const updateToken = await User.findByIdAndUpdate(args.id, {
                'resetToken.hash': hash,
                'resetToken.expiredIn': expiredIn,
            })
            return updateToken
        },
        deleteUser: async (parent, args) => {
            const { id } = args;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new Error(`User with ID ${id} not found`);
            }
            return deletedUser
        },

        createEmployer: async (parent, args) => {
            const { 
                logo,
                cover,
                companyName,
                contactEmail,
                phone,
                website,
                industry,
                about,
                founded,
                companySize,
                admin,
            } = args;
            const newEmployer = new Employer({
                logo,
                cover,
                companyName,
                contactEmail,
                phone,
                website,
                industry,
                about,
                founded,
                companySize,
                admin,
            });
            await newEmployer.save();
            return newEmployer;
        },
        updateEmployer: async (parent, args) => {
            const { 
                id,
                logo,
                cover,
                companyName,
                contactEmail,
                phone,
                website,
                industry,
                about,
                founded,
                companySize,
            } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                logo,
                cover,
                companyName,
                contactEmail,
                phone,
                website,
                industry,
                about,
                founded,
                companySize,
            })
            return updateEmployer;
        },
        updateSocialEmployer: async (parent, args) => {
            const { 
                id,
                social,
            } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                    social
                }
            )
            return updateEmployer;
        },
        updateContactEmployer: async (parent, args) => {
            const { id, contact } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id , {
                contact
            })
            return updateEmployer;
        },
        deleteEmployer: async (parent, args) => {
            const { id } = args;
            const deletedEmployer = await Employer.findByIdAndDelete(id);
            if (!deletedEmployer) {
                throw new Error(`Employer with ID ${id} not found`);
            }
            return deletedEmployer
        },
        addApplicantToShortlistedEmployer: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                $addToSet: {
                    "shortlisted.applicants": shortlisted
                }
            })
            return updateEmployer;
        },
        addCandidateToShortlistedEmployer: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                $push: {
                    "shortlisted.candidates": shortlisted
                }
            })
            return updateEmployer;
        },
        deleteApplicantShortlistedEmployer: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                $pull: {
                    "shortlisted.applicants": shortlisted
                }
            })
            return updateEmployer
        },
        deleteCandidateShortlistedEmployer: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                $pull: {
                    "shortlisted.candidates": shortlisted
                }
            })
            return updateEmployer
        },
        deleteAllShortlistedEmployer: async (parent, args) => {
            const { id } = args;
            const updateEmployer = await Employer.findByIdAndUpdate(id, {
                shortlisted: []
            })
            return updateEmployer;
        },
        
        createCandidate: async (parent, args) => {
            const newCandidate = new Candidate({
                ...args
            });
            await newCandidate.save();
            return newCandidate;
        },
        updateCandidate: async (parent, args) => {
            const {
                id,
                avatar,
                fullName,
                jobPosition,
                phone,
                email,
                website,
                expectedSalary,
                qualification,
                experience,
                age,
                education,
                languages,
                specialisms,
                description,
            } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                avatar,
                fullName,
                jobPosition,
                phone,
                email,
                website,
                expectedSalary,
                qualification,
                experience,
                age,
                education,
                languages,
                specialisms,
                description,
            })
            return updateCandidate;
        },
        updateSocialCandidate: async (parent, args) => {
            const { id, social } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                social
            })
            return updateCandidate;
        },
        updateContactCandidate: async (parent, args) => {
            const { id, contact } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                contact
            })
            return updateCandidate
        },
        updateCvCandidate: async (parent, args) => {
            const { id, cv } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                cv
            })
            return updateCandidate;
        },
        addEmployerShortlistedCandidate: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateCanidate = await Candidate.findByIdAndUpdate(id, {
                $push: {
                    "shortlisted.employers": shortlisted
                }
            })
            return updateCanidate
        },
        addJobShortlistedCandidate: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                $push: {
                    "shortlisted.jobs": shortlisted
                }
            })
            return updateCandidate;
        },
        deleteEmployerShortlistedCandidate: async (parent, args) => {
            const { id, shortlisted } = args;
            console.log("args - ", args)
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                $pull: {
                    "shortlisted.employers": shortlisted
                }
            })
            console.log("updateCandidate - ", updateCandidate)
            return updateCandidate;
        },
        deleteJobShortlistedCandidate: async (parent, args) => {
            const { id, shortlisted } = args;
            const updateCandidate = await Candidate.findByIdAndUpdate(id, {
                $pull: {
                    "shortlisted.jobs": shortlisted
                }
            })
            return updateCandidate;
        },
        deleteCandidate: async (parent, args) => {
            const { id } = args;
            const deleteCandidate = await Candidate.findByIdAndDelete(id);
            if (!deleteCandidate) {
                throw new Error(`User with ID ${id} not found`);
            }
            return deleteCandidate
        },

        createJob: async (parent, args) => {
            const { 
                jobTitle, description, specialisms, workplaceModes, experience, contact,
                qualification, salary, expiredDate, employer, display, jobPosition, employmentType
             } = args;
            const newJob = new Job({
                jobTitle, description, specialisms, workplaceModes, experience, contact,
                qualification, salary, expiredDate, employer, display, jobPosition, employmentType
            });
            await newJob.save();
            return newJob;
        },
        updateJob: async (parent, args) => {
            const updateJob = await Job.findByIdAndUpdate(args.id, {
                ...args
            })
            return updateJob;
        },
        appliedJob: async (parent, args) => {
            const { id } = args;
            const updateJob = await Job.findByIdAndUpdate(id, {
                $inc: { applied: 1 }
            })
            return updateJob;
        },
        deleteJob: async (parent, args) => {
            const { id } = args;
            const deletedJob = await Job.findByIdAndDelete(id);
            if (!deletedJob) {
                throw new Error(`User with ID ${id} not found`);
            }
            return deletedJob
        },

        // Resume Mutation
        createResume: async (parent, args) => {
            const {
                candidate, cv, description, education, experience,
                portfolio, awards, specialisms
            } = args;
            const newResume = new Resume({
                candidate, cv, description, education, experience,
                portfolio, awards, specialisms
            })
            await newResume.save();
            return newResume;
        },
        updateResume: async (parent, args) => {
            const {
                id, cv, description, education, experience,
                portfolio, awards, specialisms
            } = args;
            const updateResume = await Resume.findByIdAndUpdate(id, {
                cv, description, education, experience,
                portfolio, awards, specialisms
            })
            return updateResume;
        },
        deleteResume: async (parent, args) => await Resume.findByIdAndDelete(args.id),

        // Applicant Mutation
        createApplicant: async (parent, args) => {
            const {
                candidate, employer, job, status
            } = args;
            const newApplicant = new Applicant({
                candidate, employer, job, status
            })
            await newApplicant.save();
            return newApplicant;
        },
        updateApplicant: async (parent, args) => {
            const { id, status } = args;
            const updateApplicant = await Applicant.findByIdAndUpdate(id, {
                status
            })
            return updateApplicant
        },
        deleteApplicant: async (parent, args) => {
            const deletedApplicant = await Applicant.findByIdAndDelete(args.id)
            return deletedApplicant;
        },

        // Notify Mutation
        createNotify: async (parent, args) => {
            const newNotify = new Notify({
                ...args
            })
            await newNotify.save()
            const notify = await newNotify.populate(['user', 'recipients'])
            return notify;
        },
        deleteNotify: async (parent, args) => await Notify.findByIdAndDelete(args.id),
        isReadNotify: async (parent, args) => {
            const updateNotify = await Notify.findByIdAndUpdate(args.id, {
                isRead: true
            })
            return updateNotify;
        },
        updateNotify: async (parent, args) => await Notify.findByIdAndUpdate(args.id, {
            ...args
        }),
        deleteAllNotify: async (parent, args) => {
            const updateNotify = await Notify.deleteMany({ recipients: { $in: args.id }})
            return updateNotify;
        },
    },
};