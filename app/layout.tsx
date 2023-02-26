import { Session } from 'next-auth';
import { headers } from 'next/headers';
import AuthContext from './AuthContext';
import './globals.css';

export interface IProps {
  children: React.ReactNode;
  // session: Session;
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.LOCAL_AUTH_URL ?? process.env.NEXTAUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    },
  );

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({ children }: IProps) {
  const session = await getSession(headers().get('cookie') ?? '');
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}
