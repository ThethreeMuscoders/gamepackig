module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();

    const err = new Error("User is Not Autorized");
    err.satus = 401;
    next(err);
  },
};