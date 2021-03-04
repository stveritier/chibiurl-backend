import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Auth from '../controllers/auth/auth.controller';

const routes = Router();

routes.post('/auth/login', asyncHandler(Auth.Login));
routes.post('/auth/signup', asyncHandler(Auth.Signup));

routes.post('/auth/login');
