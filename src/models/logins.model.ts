import mongoose, { Schema } from 'mongoose';

const loginSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  inDate: {
    type: Date,
  },
});

const Login = mongoose.model('login', loginSchema, 'logins');

export { Login };
