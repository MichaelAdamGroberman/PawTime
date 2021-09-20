const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Pet, Vaccinations, Exercise, Appointments } = require('../models');

// TODO: for landing page without authentication
router.get('/', async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [
        {
          model: Vaccinations,
          attributes: [],
        },
        {
          model: Exercise,
          attributes: [],
        },
        {
          model: Appointments,
          attributes: ['date', 'notes'],
        },
      ],
    });

    const petCardProfile = petData.map((petCard) =>
      petCard.get({ plain: true })
    );
    console.log(petCardProfile);
    // Route for rendeing homepage
    res.render('landingpage', {
      petCardProfile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Route for rendeing homepage
//     res.render('profile', {
//       // Passing the logged_inn flag value from the session object to the
//       // handlebar's homepage view
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/profile', (req, res) => {
  // If the user is already logged in redirect the page to the homepage
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('profile');
});

router.get('/login', (req, res) => {
  // If the user is already logged in redirect the page to the homepage
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in redirect the page to the homepage
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
