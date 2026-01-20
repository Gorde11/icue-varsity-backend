export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || [];

  console.error(`[ERROR] ${status}: ${message}`, err);

  res.status(status).json({
    success: false,
    message,
    status,
    errors: errors.length > 0 ? errors : undefined,
    timestamp: new Date(),
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
