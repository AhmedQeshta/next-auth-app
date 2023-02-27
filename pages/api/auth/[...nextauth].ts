import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@/lib/mongodb';
import Users from '@/utils/models/UsersSchema';
import { compare, hash } from 'bcryptjs';
import { sendEmail } from '@/lib/email';
import { newUserEmail } from '@/utils/emailTemplets';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
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
  callbacks: {
    async signIn({ user }) {
      const { id, email, name: username } = user ?? {};
      connectMongo().catch((err) => {
        return { error: 'Database connection error' };
      });

      const checkExisting = await Users.findOne({ email } || { username });

      if (checkExisting) {
        sendEmail({
          to: email ?? '',
          subject: 'Welcome to NextAPI',
          html: newUserEmail(email ?? '', `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/login`),
        });
        return true;
      }

      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hash(randomPassword, 12);
      const newUser = await Users.create({ username, email, password: hashedPassword });
      if (!newUser) return false;

      await sendEmail({
        to: email ?? '',
        subject: 'Welcome to NextAPI',
        html: newUserEmail(
          email ?? '',
          `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/login`,
          randomPassword,
        ),
      });
      return true;
    },
  },
};
export default NextAuth(authOptions);
