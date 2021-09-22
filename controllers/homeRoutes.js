const router = require('express').Router();
const withAuth = require('../utils/auth');
const {
  Pet,
  Vaccinations,
  Exercise,
  Appointments,
  User,
  Notes,
} = require('../models');

router.get('/', (req, res) => {
  res.render('landingpage');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
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
          attributes: [],
        },
        {
          model: Notes,
          attributes: [],
        },
      ],
    });

    const petCards = petData.map((petCard) => petCard.get({ plain: true }));

    // Route for rendeing homepage
    res.render('profile', {
      ...petCards,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// GET petprofile -> bring to individual pet profile
router.get('/petprofile', async (req, res) => {
  try {
    res.render('pets');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in redirect the page to the landingpage
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // If not, render
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

// PRACTICE
router.get('/petpage', (req, res) => {
  res.render('pets');
});
