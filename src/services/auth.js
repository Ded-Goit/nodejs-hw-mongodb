import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'User with this email already registered!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'User with given credentials does not exist!');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User with given credentials does not exist!');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await Session.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
    userId: user._id,
  });

  return session;
};

export const logoutUser = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId);
};

//  додано новий сервіс
export const refreshSession = async (sessionId, refreshToken) => {
  const oldSession = await Session.findById(sessionId);

  if (
    !oldSession ||
    oldSession.refreshToken !== refreshToken ||
    oldSession.refreshTokenValidUntil < new Date()
  ) {
    throw createHttpError(401, 'Invalid session or refresh token!');
  }

  // видаляємо стару
  await Session.findByIdAndDelete(sessionId);

  // створюємо нову
  const newSession = await Session.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
    userId: oldSession.userId,
  });

  return newSession;
};
