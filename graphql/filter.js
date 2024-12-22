import { isNumber } from "util";


export const filterCandidate = (filter) => {
    const { fullName, jobPosition, qualification, experience } = filter;
    console.log("filter - ", filter)
    const options = {
        $and: [
            fullName ? {
                fullName: { $regex: fullName }
            } : {}, 
            jobPosition ? {
                jobPosition: { $regex: jobPosition }
            } : {}, 
            typeof experience === "number" ? {
                experience: { $gte: experience }
            } : {},
            qualification ? {
                qualification: qualification
            } : {}
        ]
    }
    console.log("options - ", options)
    return options
}

export const filterEmployer = (filter) => {
    const { companyName, industry } = filter
    const options = {
        $and: [
            companyName ? {
                companyName: { $regex: companyName }
            } : {},
            industry ? {
                industry: { $regex: industry }
            } : {},
        ]
    }
    return options
}

export const filterJob = (filter) => {
    const { jobTitle, workplaceModes, jobPosition, experience, salary, employmentType, specialisms } = filter
    const options = {
        $and: [
            jobTitle ? {
                jobTitle: { $regex: jobTitle }
            } : {},
            workplaceModes ? {
                workplaceModes: { $regex: workplaceModes }
            } : {},
            jobPosition ? {
                jobPosition: { $regex: jobPosition }
            } : {},
            (typeof experience === 'number' && experience >= 0) ? {
                experience: { $lte: experience }
            } : {},
            employmentType ? {
                employmentType: { $regex: employmentType }
            } : {},
            salary ? {
                salary: { $gte: salary.min, $lte: salary.max }
            } : {},
            specialisms?.length > 0 ? {
                specialisms: { $all: specialisms.map(item => item) }
            } : {}
        ]
    }
    return options
}

export const applicantFilterByEmployer = (filter) => {
    const { filterDate, filterJob, status } = filter;
    const options = {
        $and: [
            status ? {
                status: status
            } : {},
            filterDate ? {
                createdAt: { $gte: filterDate }
            } : {},
            filterJob ? {
                job: filterJob
            } : {},
        ]
    }
    return options;
}