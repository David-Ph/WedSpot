module.exports = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    errors: err.message || [err.message],
  });
};
