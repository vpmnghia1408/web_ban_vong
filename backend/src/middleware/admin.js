const adminMiddleware = (req, res, next) => {
  if (Number(req.userRoleId) !== 0) {
    return res.status(403).json({
      success: false,
      message: "Admin permission required",
    });
  }

  next();
};

export default adminMiddleware;
