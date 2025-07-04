
export const GlobalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const success = err.success || false;
  const message = err.message || "Something Went Wrong";
  const data = err.data || [];

  console.log(err)
  return res.status(statusCode).json({ statusCode, success, message, data });
};
