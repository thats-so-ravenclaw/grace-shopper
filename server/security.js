function isAuthenticated(req, res, next) {
  // // console.log('REQUEST', req);
  // console.log('RAW HEADERS', req.rawHeaders)
  // console.log('CONTAINS', req.rawHeaders.includes('Referer'))
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

module.exports = isAuthenticated;
