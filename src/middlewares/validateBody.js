import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    if (req.file) {
      return next();
    }

    await schema.validateAsync(req.body, {
      abortEagly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
