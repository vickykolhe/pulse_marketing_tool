export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  };
};
