import { Request, Response } from 'express';
import SignupValidation from '../../validation/schemas/signup.schema';
import { hashPassword } from '../../utils/hash-password';
import { comparePassword } from '../../utils/compare-password';
import { generateAuthToken } from '../../utils/generate-auth-token';
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

interface LoginUser {
  email: string;
  password: string;
}
interface LoginBody {
  user: LoginUser;
}

export default class AuthController {
  static async Login(
    req: Request<Record<string, unknown>, Record<string, unknown>, LoginBody>,
    res: Response
  ): Promise<void> {
    if (!req.body.user.password || !req.body.user.email) {
      res.status(400).send();
      return;
    }
    const user = await User.findOne({ email: req.body.user.email });

    if (!user) {
      res.status(400).send({ error: 'InvalidEmailOrPassword' });
      return;
    }

    const passwordCheck = comparePassword(
      req.body.user.password,
      user.password
    );

    if (!passwordCheck) {
      res.status(400).send({ error: 'InvalidEmailOrPassword' });
      return;
    }

    const { jwt, expirationDate } = generateAuthToken({
      email: user.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
      id: user._id,
    });

    user.tokens.push({ token: jwt, expireDate: expirationDate });

    res.status(200).send({ token: jwt });
  }

  static async Signup(
    req: Request<Record<string, unknown>, Record<string, unknown>, SignupBody>,
    res: Response
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
