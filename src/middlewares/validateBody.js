import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const formattedErrors = err.details.map((e) => {
      // прибираємо лапки та робимо повідомлення простішим
      return e.message.replace(/"/g, '');
    });

    next(createHttpError(400, 'Bad Request', { errors: formattedErrors }));
  }
};
