import NextAuth from 'next-auth';

declare module "next-auth" {
    interface Session {
        user: {
            id: String,
            avatar: String,
            email: String,
            image: String,
            name: String,
            type: String,
            candidateInfo: Object,
            employerInfo: Object,
        },
    }
}