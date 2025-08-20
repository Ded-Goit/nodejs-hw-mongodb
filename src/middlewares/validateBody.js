import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    // Формуємо детальну інформацію про помилки
    const errors = err.details.map((detail) => ({
      message: detail.message,
      path: detail.path.join('.'),
      type: detail.type,
    }));

    next(
      createHttpError(400, 'Validation Error', {
        errors,
      }),
    );
  }
};
