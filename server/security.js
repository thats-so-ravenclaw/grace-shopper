function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function isUser(req, res, next) {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = { isAdmin, isUser };
