import TwitterProvider from 'next-auth/providers/twitter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import { setCookie, destroyCookie } from 'nookies';
import axios, { axiosQL } from '../../../lib/axios'
const APPURL = process.env.APP_URL;

export const getNextAuthOptions = (req, res) => {
  const authOptions = {
    providers: [
      // OAuth authentication providers...
      TwitterProvider({
        clientId: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      }),
  
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        async authorize(credentials) {
          // Add logic here to look up the user from the credentials supplied
          try {
            const { email } = credentials;
            const { data: user } = await axios.post('/api/user/session', { email: email })
            if(user) return user
            else return false;
          } catch (err) {
            console.log("[auth-credentials] err - ", err)
            return false
          }
        }
      }),
  
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ],
    pages: {
      signIn: '/login',
      signOut: '/logout',
      error: '/500'
    },
    callbacks: {
      async signIn({user, account, profile}) { 

        // Google Provider
        if (account.provider === "google") {
          try {
            // Find user in database first
            const { data: userData } = await axios.post('/api/user/session', { email: profile.email })
            // set data after find user
            // set cookies of userType
            const userType = await req.cookies.userType;

            // If user have in database return true to client
            if(userData !== null) {
              const { id, email, type, avatar } = userData;
              // Set user
              user.id = id;
              user.email = email;
              user.avatar = avatar;
              user.type = type;
              user.candidateInfo = userData.candidateInfo;
              user.employerInfo = userData.employerInfo;
              user.provider = userData.provider;
              user.loggedIn = "google"

              return true;
            }
            // Else if user dont have in database and signIn from signUp page
            else if ((userData === null) && (userType !== 'null')) {
              // Create new user in database and return token
              const { data } = await axiosQL.post('', {
                query: `mutation createUser($email: String, $name: String, $avatar: String, $type: String) {
                  createUser(email: $email, name: $name, avatar: $avatar, type: $type) {
                    id, email, type, avatar, name
                  }
                }`,
                variables: {
                  email: profile.email,
                  name: profile.name,
                  avatar: profile.picture,
                  type: userType,
                  provider: 'Google'
                }
              })

              const { createUser } = data.data;
              // console.log("[createUser] - ", createUser)
              const { id, email, type, avatar } = createUser;
              // Set user to pass to session
              user.id = id;
              user.email = email;
              user.avatar = avatar;
              user.type = type;
              user.loggedIn = "google"

              return true;
            // Else if user have in database and signIn from register page
            } else {
              // console.log("[Google-signIn] - return error message to client...")
              // Return error message and data to cookies for client
              setCookie({ res }, "providerMessage", JSON.stringify({...profile, message: 'Please sign up first'}), {
                maxAge: 60 * 5,
                path: '/',
                httpOnly: true,
              })
              // redirect to register
              return APPURL + '/register'
            }
          } catch (err) {
            console.log("[callback-signIn] google-provider error - ", err.response.data.errors)
            console.log("[callback-signIn] google-provider error - ", err)
            return false
          }
        }

        return true;
      },
      async jwt({ token, user, trigger, session }) {
        // Token is origin data from provider
        // console.log("[callbacks-jwt] token - ", token)
        // User is data from function signIn
        // console.log("[callbacks-jwt] user - ", user)
        // console.log("[callbacks-jwt] session - ", session)
        // If call update session 
        if(trigger === "update"){
          const { data } = await axios.post('/api/user/session', { email: token.email })
          const { avatar } = data;
          token.avatar = avatar;
          token.candidateInfo = data.candidateInfo;
          token.employerInfo = data.employerInfo;
          return token;
        }
        // merge token and user
        return { ...token, ...user };
      },
      async session({ session, token }) {
        // console.log("[callbacks-session] session - ", session)
        // console.log("[callbacks-session] token - ", token)
        // change user default of session to token from jwt token then return session to client
        session.user = token
        return session
      },
      async redirect({ url, baseUrl }) { 
        return baseUrl 
      },
    },
    session: {
      strategy: 'jwt',
      maxAge: 60 * 60 * 8
    },
    jwt: {
      // Default is 30days
      maxAge: 60 * 60 * 8,
    },
    secret: process.env.NEXTAUTH_SECRET
  }

  return authOptions;
}

export default function handler(req, res) {
  return NextAuth(req, res, getNextAuthOptions(req, res));
}