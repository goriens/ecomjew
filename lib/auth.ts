import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import dbConnect from './dbConnect';
import UserModel from './models/UserModel';

export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials) return null;

        const user = await UserModel.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/error',
  },
  callbacks: {
    // Add signIn callback to handle Google sign-in
    async signIn({ user, account, profile }: any) {
      if (account?.provider === 'google') {
        await dbConnect();

        // Check if user exists
        let dbUser = await UserModel.findOne({ email: user.email });

        if (!dbUser) {
          // Create new user if doesn't exist
          dbUser = await UserModel.create({
            email: user.email,
            name: user.name,
            // Since it's Google auth, we won't have a password
            // You might want to add other fields as needed
            isAdmin: false,
            // Optional: Store Google ID if needed
            googleId: account.providerAccountId,
          });
        }

        // Update the user object with the database _id
        user._id = dbUser._id;
        user.isAdmin = dbUser.isAdmin;
      }
      return true; // Return true to allow sign-in
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
