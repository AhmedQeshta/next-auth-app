'use client';
import Authenticated from '@/components/auth/Authenticated';
import Guest from '@/components/auth/Guest';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return session ? <Authenticated session={session} /> : <Guest />;
}
