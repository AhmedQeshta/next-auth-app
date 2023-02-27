// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import Users from '@/utils/models/UsersSchema';
import { sendEmail } from '@/lib/email';
import { newUserEmail } from '@/utils/emailTemplets';

type userType = {
  username: string;
  password: string;
  email: string;
  _id: string;
  __v: number;
};

interface Data {
  message: string;
  status?: boolean;
  user?: userType;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  connectMongo().catch((error) => {
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  });

  if (req.method !== 'POST')
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });

  if (!req.body) return res.status(400).json({ status: false, message: 'Bad Request' });

  const { username, password, email } = req.body;
  const checkExisting = await Users.findOne({ email } || { username });

  if (checkExisting) return res.status(422).json({ status: false, message: 'User is exist' });

  const hashedPassword = await hash(password, 12);

  const user = await Users.create({ username, email, password: hashedPassword });

  if (!user) return res.status(500).json({ status: false, message: 'Internal Server Error' });

  sendEmail({
    to: email ?? '',
    subject: 'Welcome to NextAPI',
    html: newUserEmail(email ?? '', `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/login`, password),
  });

  return res.status(200).json({ status: true, message: 'user register successfully', user });
}
