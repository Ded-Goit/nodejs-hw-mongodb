import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);
// authRouter.post('/auth/refresh-session');

authRouter.post('/auth/refresh', refreshSessionController);

export default authRouter;
