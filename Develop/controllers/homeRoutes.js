const router = require('express').Router(); 
const withAuth = require('../utils/auth');

// TODO: for landing page without authentication
router.get('/', async (req, res) => {
  try {   
    // Route for rendeing homepage
    res.render('landingpage', {
      // QUESTION: empty ???
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', withAuth, async (req, res) => {
  try {   
    // Route for rendeing homepage
    res.render('homepage', {
      // Passing the logged_inn flag value from the session object to the 
      // handlebar's homepage view  
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in redirect the page to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
