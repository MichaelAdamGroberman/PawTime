const router = require('express').Router();
const { Appointments } = require('../../models');

// Route for creating the new appointment information
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointments.create({
      notes: req.body.appointmentNote,
      date: req.body.appointmentDate,
      address: req.body.appointmentAddress,
    });

    if (req.session.user_id) {
      res.redirect('/appointments');
      return;
    }

    //TODO: call the util functon for sending email

    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for deleting the existing appointment information
router.delete('/:id', async (req, res) => {
  try {
    const apptData = await Appointments.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!apptData) {
      res.status(404).json({
        message: 'No appointment found with this id!',
      });
      return;
    }

    res.status(200).json(apptData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for updating the existing appointment information
router.put('/:id', async (req, res) => {
  try {
    const apptData = await Appointments.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!apptData) {
      res.status(404).json({
        message: 'No appointment found with this id!',
      });
      return;
    }

    res.status(200).json(apptData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get specfic appointment using the id
router.get('/:id', async (req, res) => {
  try {
    const apptData = await Appointments.findByPk(req.params.id);
    if (!apptData) {
      res.status(404).json({
        message: 'No appointment found with this id!',
      });
      return;
    }

    const appt = apptData.get({
      plain: true,
    });
    res.status(200).json(appt);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all appointments for a pet
router.get('/bypet/:pet_id', async (req, res) => {
  try {
    const petId = req.params.pet_id;
    const apptData = await Appointments.findAll({
      where: {
        pet_id: petId,
      },
      order: [['date', 'ASC']],
    });

    const appts = apptData.map((appt) =>
      appt.get({
        plain: true,
      })
    );
    res.status(200).json(apptData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
