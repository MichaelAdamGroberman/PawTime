const router = require('express').Router();
const { Exercises} = require('../../models');

// Route for creating the new exercise information
router.post('/', async (req, res) => {
    try {
        const exercise = await Exercises.create({
            ...req.body
        });

        res.status(200).json(excercise);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route for deleting the existing excercise information
router.delete('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercises.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!exerciseData) {
            res.status(404).json({
                message: 'No Exercise found with this id!',
            });
            return;
        }

        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for updating the existing excercise information
router.put('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercises.update({
            ...req.body
        }, {
            where: {
                id: req.params.id,
            },
        }); 
        if (!exerciseData) {
            res.status(404).json({
                message: 'No Exercise found with this id!',
            });
            return;
        }

        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get specfic exercise using the id
router.get('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercises.findByPk(req.params.id);
        if (!exerciseData) {
            res.status(404).json({
                message: 'No Excercise found with this id!'
            });
            return;
        }

        const exerciseConst = exerciseData.get({
            plain: true
        });
        res.status(200).json(exercise);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all exercise for a pet
router.get('/bypet/:pet_id', async (req, res) => {
    try {
        const petId = req.params.pet_id;
        const exerciseData = await Exercises.findAll({
            where: {
                pet_id: petId,
            },
            order: [
                ['date', 'ASC']
            ],
        });

        const exercise = exerciseData.map((appt) => exercise.get({
            plain: true
        }));
        res.status(200).json(exerciseData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;