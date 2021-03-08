import jwt from 'jsonwebtoken';
import dateFns from 'date-fns';

interface User {
  id: string;
  email: string;
}

export const generateAuthToken = (
  user: User
): { jwt: string; expirationDate: Date } => {
  const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET!, {
    expiresIn: '2d',
  });

  const expirationDate = dateFns.addDays(new Date(), 2);

  return { jwt: token, expirationDate };
};
