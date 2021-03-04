import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import SignupValidation from '../../validation/schemas/signup.schema';
import { hashPassword } from '../../utils/hash-password';
import { User } from '../../models/user.model';

interface SignupUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupBody {
  user: SignupUser;
}

export default class AuthController {
  static async Login(
    req: Request<Record<string, unknown>, Record<string, unknown>, SignupBody>,
    res: Response,
    next: NextFunction
  ) {}

  static async Signup(
    req: Request<Record<string, unknown>, Record<string, unknown>, SignupBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (!req.body.user) {
      res.status(400).send();
      return;
    }
    const { user } = req.body;
    const validatedUser = SignupValidation.validate(user);

    if (validatedUser.error) {
      res.status(400).send({ error: validatedUser.error });
      return;
    }

    const hashedPassword = await hashPassword(user.password);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send();
  }
}
