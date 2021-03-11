import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../../models/user.model';

interface Payload {
  payload: { id: string; email: string };
  exp: number;
  sub: number;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.headers.authorization) {
    res.status(401).send({ error: 'TokenMissing' });
    return;
  }
  const token = req.headers.authorization.split(' ')[1];

  let payload: Payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send({ error: 'TokenExpired' });
      return;
    }
    res.status(401).send({ error: 'TokenInvalid' });
    return;
  }

  // check if the user exists
  const user = await User.findById(payload.sub);

  if (!user) {
    res.status(401).send({ error: 'UserNotFound' });
    return;
  }
  req.user = payload.sub;
  next();
}

const wrappedFn = asyncHandler(ensureAuthenticated);

export { wrappedFn as ensureAuthenticated };
