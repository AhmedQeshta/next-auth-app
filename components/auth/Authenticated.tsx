import React from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';

import { signOut } from 'next-auth/react';

export interface IAuthProps {
  session: Session;
}

const Authenticated = ({ session }: IAuthProps) => {
  return (
    <main className="container mx-auto text-center h-screen flex justify-center items-center flex-col">
      <h3 className="text-4xl font-bold">Authorized User - HomePage</h3>

      <div className="flex  flex-col md:flex-row w-2/3 md:w-2/6 justify-center items-center p-5 my-5 bg-slate-100 gap-5 rounded-md mx-auto">
        <div className="rounded-full">
          <Image
            src={session.user?.image!}
            className="rounded-full"
            width="100"
            height="100"
            alt={session.user?.name!}
          />
        </div>
        <div>
          <h5>{session.user?.name}</h5>
          <h5>{session.user?.email}</h5>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Authenticated;
