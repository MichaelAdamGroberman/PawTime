const router = require('express').Router();
const { User } = require('../../models');

// Route to handle posting of user which will be used for Sign up screen
// Create User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Read User Information for login
router.post('/login', async (req, res) => {
  try {
    // finding if the (one) email entered match with the existing emails in database
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('email passed in');

    // validating if the password is entered correctly
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log('password passed in');

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log('Logged in');
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log('something broke');
    console.log(err);
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
