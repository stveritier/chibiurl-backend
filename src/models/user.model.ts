import mongoose, { Schema } from 'mongoose';

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
      refreshtoken: {
        type: String,
      },
      expireDate: {
        type: String,
      },
    },
  ],
  userStatus: {
    type: String,
    default: 'active',
  },
});

const User = mongoose.model('user', userSchema, 'users');

export { User };
