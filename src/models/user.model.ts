import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tokens: [{ token: string; expireDate: Date }];
  userStatus: string;
}

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      expireDate: {
        type: Date,
      },
    },
  ],
  userStatus: {
    type: String,
    default: 'active',
  },
});

const User = mongoose.model<IUser>('user', userSchema, 'users');

export { User, IUser };
