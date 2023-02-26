// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectMongo from '@/database/connection';
import Users from '@/models/UsersSchema';

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
  return res.status(200).json({ status: true, message: 'user register successfully', user });
}
