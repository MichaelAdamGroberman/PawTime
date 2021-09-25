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

// Get All details of a pet
async function getPetDetails(petId, userId) {

  let result = {};
  // NOTE Joining the tables not working, hence getting the details separately
  const petData = await Pet.findOne({
    where: {
      id: petId,
      user_id: userId
    }
  });

  if (petData != null) {
    result = petData.get({
      plain: true
    });
  }

  // Find all appointments
  const petAppts = await Appointments.findAll({
    where: {
      pet_id: petId
    }
  });

  if (petAppts != null) {
    result.appointments = petAppts.map((appt) => appt.get({
      plain: true
    }));
  } else {
    result.appointments = [];
  }

  // Find all appointments
  const petVaccines = await Vaccinations.findAll({
    where: {
      pet_id: petId
    }
  });

  if (petVaccines != null) {
    result.vaccinations = petVaccines.map((vac) => vac.get({
      plain: true
    }));
  } else {
    result.vaccinations = [];
  }


  // Find all exercises
  const petExercises = await Exercise.findAll({
    where: {
      pet_id: petId
    }
  });

  if (petExercises != null) {
    result.exercises = petExercises.map((exercise) => exercise.get({
      plain: true
    }));
  } else {
    result.exercises = [];
  }

  // Find all exercises
  const petNotes = await Notes.findAll({
    where: {
      pet_id: petId
    }
  });

  if (petNotes != null) {
    result.notes = petNotes.map((note) => note.get({
      plain: true
    }));
  } else {
    result.notes = [];
  }

  console.log(result);
  return result;
}

router.get('/profile', withAuth, async (req, res) => {
  try {

    const petData = await Pet.findAll({
      include: [{
          model: User,
          attributes: {
            exclude: ['password']
          },
        },
        {
          model: Vaccinations,
          attributes: ["details","date","time"],
          order: [ 
            ['date', 'DESC']
          ]
        },
        {
          model: Exercise,
          attributes: ["description","date","time"],
          order: [ 
            ['date', 'DESC']
          ]
        },
        {
          model: Appointments,
          attributes: ["address","date","time"],
          order: [ 
            ['date', 'DESC']
          ]
        },
        {
          model: Notes,
          attributes: ["title","date","time"],
        },
      ],
      where: {
        user_id: req.session.user_id
      }
    });


    console.log(petData);
    const petCards = petData.map(petCard => {
      let result = Object.assign(petCard.get({  plain: true  }));
      if (petCard.vaccinations.length) {
        result.lastVaccination = petCard.vaccinations[0].get({ plain: true });
      }
      if (petCard.exercises.length) {
        result.lastExercise = petCard.exercises[0].get({ plain: true });
      }
      if (petCard.appointments.length) {
        result.nextAppointment = petCard.appointments[0].get({ plain: true });
      }

      return result;
    });
    console.log(petCards);
    // Route for rendeing homepage
    res.render('profile', {
      petCards,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// GET petprofile -> bring to individual pet profile
router.get('/petprofile/:id', withAuth, async (req, res) => {
  try {

    const petDetails = await getPetDetails(req.params.id, req.session.user_id);
    console.log("-----" + JSON.stringify(petDetails));

    res.render('pets', {
      pet: petDetails,
      logged_in: true,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/vaccinations', async (req, res) => {
  try {
    const vaccinationData = await Vaccinations.findAll({});

    const vaccinationCards = vaccinationData.map((vaccinationCard) =>
      vaccinationCard.get({
        plain: true
      })
    );
    res.render('vaccinations', {
      vaccinationCards,
      logged_in: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/appointments', async (req, res) => {
  try {
    const appointmentData = await Appointments.findAll({});

    const appointmentCards = appointmentData.map((appointmentCard) =>
      appointmentCard.get({
        plain: true
      })
    );
    res.render('appointments', {
      appointmentCards,
      logged_in: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/exercises', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({});

    const exerciseCards = exerciseData.map((exerciseCard) =>
      exerciseCard.get({
        plain: true
      })
    );
    res.render('exercises', {
      exerciseCards,
      logged_in: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/notes', async (req, res) => {
  try {
    const noteData = await Notes.findAll({});

    const noteCards = noteData.map((noteCard) => noteCard.get({
      plain: true
    }));
    res.render('notes', {
      noteCards,
      logged_in: false,
    });
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
  // res.render('pets'); information we sent tot he pethandlebars page
});