const router = require('express').Router();

// Route to handle posting of user which will be used for Sign up screen 
// Create User
router.post('/', async (req, res) => {
  try {
    //TODO: Capture the req.body and save the values to database to create the new user
  } catch (err) {
    res.status(400).json(err);
  }
});

// Read User Information for login
router.post('/login', async (req, res) => {
  try {
     //TODO: Use the credentials posted by the user to verify the login 
  } catch (err) {
    res.status(400).json(err);
  }
});

// The logout route, which clears the session information
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
