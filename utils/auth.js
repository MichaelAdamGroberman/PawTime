const withAuth = (req, res, next) => {
  // The below if statement checks whether the user is logged in and if not logged in 
  // redirect the user to the login page. If already logged in then 
  // continue executing the next middleware/handler code
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
