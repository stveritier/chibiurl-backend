import jwt from 'jsonwebtoken';
import dateFns from 'date-fns';

interface User {
  id: string;
  email: string;
}

export const generateAuthToken = (
  user: User
): { jwt: string; expirationDate: Date } => {
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: '2d',
    subject: user.id,
  });

  const expirationDate = dateFns.addDays(new Date(), 2);

  return { jwt: token, expirationDate };
};
