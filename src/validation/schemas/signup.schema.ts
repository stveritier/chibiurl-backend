import Joi from 'joi';

const SignupValidationSchema = Joi.object({
  firstname: Joi.string().min(2).max(20).required(),
  lastname: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).max(20).required(),
});

export default SignupValidationSchema;
