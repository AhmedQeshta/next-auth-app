import AuthProvider from '@/utils/providers/AuthProvider';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
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
    <html lang="en" dir="ltr">
      <head />
      <body>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
