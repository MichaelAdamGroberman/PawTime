const router = require('express').Router();
const { Vaccinations } = require('../../models');

// Route for creating the new vaccination information
router.post('/', async (req, res) => {
  try {
    const vaccination = await Vaccinations.create({
      details: req.body.vaccinationName,
      date: req.body.vaccinationDate,
      time: req.body.vaccinationTime,
      pet_id: req.body.petId
    });

    if (req.session.user_id) {
      res.redirect('/vaccinations');
      return;
    }

    res.status(200).json(vaccination);
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

// Route for deleting the existing vaccination information
router.delete('/:id', async (req, res) => {
    try {
        const vaccinationData = await Vaccinations.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!vaccinationData) {
            res.status(404).json({
                message: 'No vaccination found with this id!',
            });
            return;
        }

        res.status(200).json(vaccinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for updating the existing vaccination information
router.put('/:id', async (req, res) => {
    try {
        const vaccinationData = await Vaccinations.update({
            ...req.body
        }, {
            where: {
                id: req.params.id,
            },
        }); 
        if (!vaccinationData) {
            res.status(404).json({
                message: 'No vaccination found with this id!',
            });
            return;
        }

        res.status(200).json(vaccinationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get specific vaccination using the id
router.get('/:id', async (req, res) => {
    try {
        const vaccinationData = await Vaccinations.findByPk(req.params.id);
        if (!vaccinationData) {
            res.status(404).json({
                message: 'No vaccination found with this id!'
            });
            return;
        }

        const vaccination = vaccinationData.get({
            plain: true
        });
        res.status(200).json(vaccination);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all vaccinations for a pet
router.get('/bypet/:pet_id', async (req, res) => {
    try {
        const petId = req.params.pet_id;
        const vaccinationData = await Vaccinations.findAll({
            where: {
                pet_id: petId,
            },
            order: [
                ['date', 'ASC']
            ],
        });

        const vaccinations = vaccinationData.map((vaccination) => vaccination.get({
            plain: true
        }));
        res.status(200).json(vaccinations);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
