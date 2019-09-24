function isAuthenticated(req, res, next) {
  if (req.rawHeaders.includes('Referer')) {
    return next();
  } else if (req.user) {
    const isAdmin = req.user.isAdmin;
    if (!req.rawHeaders.includes('Referer') && isAdmin) {
      return next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
}

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

module.exports = { isAuthenticated, isAdmin, isUser };
