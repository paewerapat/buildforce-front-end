import { gql } from 'graphql-tag'

export const typeDefs = gql`

    scalar Date
    scalar JSON
    scalar JSONObject
    scalar BigInt
    union NotifyType = Candidate | Employer

    type User {
        id: ID
        email: String
        username: String
        password: String
        name: String
        type: String
        candidateInfo: Candidate
        employerInfo: Employer
        avatar: String
        provider: String
        resetToken: ResetToken
    }
    type ResetToken {
        hash: String
        expiredIn: BigInt
    }
    type Candidate {
        id: ID
        avatar: String
        fullName: String
        jobPosition: String
        phone: String
        email: String
        website: String
        expectedSalary: Int
        experience: Int
        age: Int
        qualification: String
        languages: [String]
        specialisms: [String]
        description: String
        social: Social
        contact: Contact
        user: User
        cv: Cv
        shortlisted: ShortlistedCandidate
        createdAt: Date
    }
    type Employer {
        id: ID,
        logo: String
        cover: String
        companyName: String
        contactEmail: String
        phone: String
        website: String
        industry: String
        about: String
        founded: String
        companySize: String
        social: Social
        contact: Contact
        admin: [User]
        shortlisted: ShortlistedEmployer
        createdAt: Date
        updatedAt: Date
    }
    type Job {
        id: ID
        jobTitle: String
        description: String
        jobPosition: String
        specialisms: [String]
        workplaceModes: String
        employmentType: String
        salary: Int
        experience: Int
        qualification: String
        expiredDate: Date
        display: Boolean
        employer: Employer
        contact: Contact
        applied: Int
        createdAt: Date
        updatedAt: Date
    }
    type Applicant {
        id: ID
        candidate: Candidate
        employer: Employer
        job: Job
        status: String
        cv: Cv
        createdAt: Date
        updatedAt: Date
    }

    type Social {
        facebook: String
        twitter: String
        linkedin: String
    }
    type Contact {
        country: String
        city: String
        address: String
    }
    type Cv {
        name: String
        url: String
    }

    type Resume {
        id: ID
        candidate: Candidate
        cv: Cv
        description: String
        education: [Education]
        experience: [Experience]
        portfolio: Portfolio
        awards: [Awards]
        specialisms: [String]
        createdAt: Date
        updatedAt: Date
    }

    type Education {
        academicFields: String
        college: String
        educationYear: String
        educationDescription: String
        id: String
    }
    type Experience {
        jobPosition: String
        companyName: String
        experienceYear: String
        experienceDescription: String
        id: String
    }
    type Portfolio {
        name: String
        url: String
    }
    type Awards {
        awardTitle: String
        awardProject: String
        awardYear: String
        awardDescription: String
        id: String
    }
    type ShortlistedEmployer {
        applicants: [Applicant]
        candidates: [Candidate]
    }
    type ShortlistedCandidate {
        jobs: [Job]
        employers: [Employer]
    }
    type Notify {
        id: ID
        user: NotifyType
        recipients: [NotifyType]
        userType: UserType
        recipientsType: UserType
        url: String
        text: String
        image: String
        content: String
        isRead: Boolean
        createdAt: Date
        updatedAt: Date
    }
    
    enum UserType {
        Candidate
        Employer
    }

    input EducationInput {
        academicFields: String
        college: String
        educationYear: String
        educationDescription: String
        id: String
    }
    input ExperienceInput {
        jobPosition: String
        companyName: String
        experienceYear: String
        experienceDescription: String
        id: String
    }
    input PortfolioInput {
        name: String
        url: String
    }
    input AwardsInput {
        awardTitle: String
        awardProject: String
        awardYear: String
        awardDescription: String
        id: String
    }
    input SocialInput {
        facebook: String
        twitter: String
        linkedin: String
    }
    input ContactInput {
        country: String
        city: String
        address: String
    }
    input CvInput {
        name: String
        url: String
    }

    type Query {
        users: [User] #return array of students
        userById(id: ID): User #return student by id
        userByEmailOrUsername(email: String, username: String): User
        userByResetToken(hash: String): User

        candidates(page: Int, limit: Int, filter: JSONObject): [Candidate] #return array of Candidate
        candidateById(id: ID): Candidate #return Candidate by id
        candidateByUser(user: ID): Candidate #return Candidate by user

        employers(page: Int, limit: Int, filter: JSONObject): [Employer] #return array of Employer
        employerById(id: ID): Employer #return Employer by id
        employerByUser(admin: ID): Employer #return Employer by admin

        jobs(page: Int, limit: Int, filter: JSONObject): [Job] #return array of Job
        jobById(id: ID): Job #return Job by id
        jobByEmployer(employer: ID, filter: String, page: Int, limit: Int): [Job]
        allJob: [Job]
        allJobByEmployer(id: ID): [Job]
        allJobPositionByCandidate(position: String): [Job]

        resumes: [Resume]
        resumeById(id: ID): Resume
        resumeByCandidate(candidate: ID): Resume

        applicants: [Applicant]
        applicantByCandidate(id: ID, page: Int, filter: String, limit: Int): [Applicant]
        applicantByEmployer(id: ID, filter: JSONObject, page: Int, limit: Int): [Applicant]
        applicantByJob(id: ID): [Applicant]
        applicantById(id: ID): Applicant
        applicantByJobAndCandidate(job: ID, candidate: ID): Applicant
        allApplicantByEmployer(id: ID): [Applicant]
        allApplicantByCandidate(id: ID): [Applicant]

        notifies: [Notify]
        notifyByRecipient(id: ID, page: Int, filter: String, limit: Int): [Notify]
        notifyIsReadByRecipient(id: ID): [Notify]
    }

    type Mutation {
        createUser(email: String, password: String, type: String, avatar: String, name: String, provider: String): User
        updateUserCandidateInfo(id: ID, candidateInfo: ID): User
        updateUserEmployerInfo(id: ID, employerInfo: ID): User
        updateUser(id: ID, email: String, username: String, password: String, avatar: String, candidateInfo: ID, employerInfo: ID): User
        deleteUser(id: ID): User
        updatePassword(id: ID, password: String): User
        updateUserToken(id: ID, resetToken: JSONObject): User

        createCandidate(
            avatar: String,
            fullName: String,
            jobPosition: String,
            phone: String,
            email: String,
            website: String,
            expectedSalary: Int,
            experience: Int,
            age: Int,
            qualification: String,
            education: String,
            languages: [String],
            specialisms: [String],
            description: String,
            user: ID
        ): Candidate
        updateCandidate(
            id: ID, 
            avatar: String,
            fullName: String,
            jobPosition: String,
            phone: String,
            email: String,
            website: String,
            expectedSalary: Int,
            experience: Int,
            qualification: String,
            age: Int,
            education: String,
            languages: [String],
            specialisms: [String],
            description: String,
        ): Candidate
        updateSocialCandidate(
            id: ID,
            social: SocialInput,
        ): Candidate
        updateContactCandidate(
            id: ID,
            contact: ContactInput
        ): Candidate
        updateCvCandidate(
            id: ID,
            cv: CvInput
        ): Candidate
        addEmployerShortlistedCandidate(
            id: ID,
            shortlisted: ID
        ): Candidate
        addJobShortlistedCandidate (
            id: ID,
            shortlisted: ID
        ): Candidate
        deleteEmployerShortlistedCandidate(
            id: ID,
            shortlisted: ID
        ): Candidate
        deleteJobShortlistedCandidate(
            id: ID,
            shortlisted: ID
        ): Candidate
        deleteCandidate(id: ID): Candidate
        
        createEmployer(
            logo: String,
            cover: String,
            companyName: String,
            phone: String,
            contactEmail: String,
            website: String,
            industry: String,
            about: String,
            founded: String,
            companySize: String,
            admin: [ID],
        ): Employer
        updateEmployer(
            id: ID,
            logo: String,
            cover: String,
            companyName: String,
            phone: String,
            contactEmail: String,
            website: String,
            industry: String,
            about: String,
            founded: String,
            companySize: String,
        ): Employer
        updateSocialEmployer(
            id: ID, 
            social: SocialInput
        ): Employer
        updateContactEmployer(
            id: ID, 
            contact: ContactInput
        ): Employer
        deleteEmployer(id: ID): Employer
        addApplicantToShortlistedEmployer(id: ID, shortlisted: ID): Employer
        addCandidateToShortlistedEmployer(id: ID, shortlisted: ID): Employer
        deleteApplicantShortlistedEmployer(id: ID, shortlisted: ID): Employer
        deleteCandidateShortlistedEmployer(id: ID, shortlisted: ID): Employer
        deleteAllShortlistedEmployer(id: ID): Employer

        createResume(
            candidate: ID,
            cv: CvInput,
            description: String,
            education: [EducationInput],
            experience: [ExperienceInput],
            portfolio: PortfolioInput,
            awards: [AwardsInput],
            specialisms: [String],
        ): Resume
        updateResume(
            id: ID
            cv: CvInput,
            description: String,
            education: [EducationInput],
            experience: [ExperienceInput],
            portfolio: PortfolioInput,
            awards: [AwardsInput],
            specialisms: [String],
        ): Resume
        deleteResume(
            id: ID
        ): Resume

        createJob(
            jobTitle: String,
            description: String,
            jobPosition: String,
            specialisms: [String],
            workplaceModes: String,
            employmentType: String,
            salary: Int,
            experience: Int,
            qualification: String,
            expiredDate: Date,
            display: Boolean,
            employer: ID,
            contact: ContactInput,
        ): Job
        updateJob(
            jobTitle: String,
            description: String,
            jobPosition: String,
            specialisms: [String],
            workplaceModes: String,
            employmentType: String,
            salary: Int,
            experience: Int,
            qualification: String,
            expiredDate: Date,
            display: Boolean,
            id: ID,
            contact: ContactInput,
        ): Job
        appliedJob(id: ID): Job
        deleteJob(id: ID): Job

        createApplicant(
            candidate: ID,
            employer: ID,
            job: ID,
            cv: CvInput,
            status: String,
        ): Applicant
        updateApplicant(
            id: ID,
            job: ID,
            status: String,
        ): Applicant
        deleteApplicant(
            id: ID,
        ): Applicant

        createNotify(
            user: ID,
            recipients: [ID],
            userType: UserType,
            recipientsType: UserType,
            url: String,
            text: String,
            image: String,
            content: String,
        ): Notify
        deleteNotify(id: ID): Notify
        updateNotify(id: ID): Notify
        isReadNotify(id: ID): Notify
        deleteAllNotify(id: ID): Notify
    }
`;
