const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/home/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
