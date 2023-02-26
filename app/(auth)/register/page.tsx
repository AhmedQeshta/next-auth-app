import Link from 'next/link';

import FormRegister from '@/components/auth/FormRegister';

const Register = () => {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-1">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
      </div>

      <FormRegister />

      <p className="text-gray-400 text-center mt-2">
        Don&apos;t have an account yet?
        <Link href="/login" className="text-blue-700 mx-1">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
