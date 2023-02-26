import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@/database/connection';
import Users from '@/models/UsersSchema';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials ?? {};
        connectMongo().catch((err) => {
          return { error: 'Database connection error' };
        });

        const result = await Users.findOne({ email });
        if (!result) throw new Error('User not found');

        const checkPassword = await compare(password ?? '', result?.password);

        if (!checkPassword || result.email !== email) throw new Error('Invalid credentials inputs');

        return result;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.APP_NEXTAUTH_SECRET,
  // callbacks: {
  //   async signIn({ user }) {
  //     let isAllowedToSignIn = true;
  //     const allowedUser = ['YOURGITHUBACCID'];
  //     console.log(user);
  //     if (allowedUser.includes(String(user.id))) {
  //       isAllowedToSignIn = true;
  //     } else {
  //       isAllowedToSignIn = false;
  //     }
  //     return isAllowedToSignIn;
  //   },
  // },
};
export default NextAuth(authOptions);
