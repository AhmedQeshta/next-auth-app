import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
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

    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
