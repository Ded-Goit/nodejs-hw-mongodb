import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'No authorization header provided'));
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Invalid authorization format'));
  }

  const session = await Session.findOne({ accessToken: token }).populate(
    'userId',
  );

  if (!session) {
    return next(createHttpError(401, 'Invalid access token'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  req.user = session.userId;
  next();
};
