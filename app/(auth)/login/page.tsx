import Link from 'next/link';
import FormLogin from '@/components/auth/FormLogin';

const Login = () => {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-1">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
      </div>
      <FormLogin />

      <p className="text-gray-400 text-center mt-2">
        Don&apos;t have an account yet?
        <Link href="/register" className="text-blue-700 mx-1">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default Login;
