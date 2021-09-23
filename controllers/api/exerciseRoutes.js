const router = require('express').Router();
const { Exercise} = require('../../models');

// Route for creating the new exercise information
router.post('/', async (req, res) => {
    try {
        const exercise = await Exercise.create({
            ...req.body
        });
        res.status(200).json(exercise);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route for deleting the existing exercise information
router.delete('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercise.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!exerciseData) {
            res.status(404).json({
                message: 'No exercise found with this id!',
            });
            return;
        }

        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for updating the existing exercise information
router.put('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercise.update({
            ...req.body
        }, {
            where: {
                id: req.params.id,
            },
        }); 
        if (!exerciseData) {
            res.status(404).json({
                message: 'No exercise found with this id!',
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
        const exerciseData = await Exercise.findByPk(req.params.id);
        if (!exerciseData) {
            res.status(404).json({
                message: 'No exercise found with this id!'
            });
            return;
        }

        const exercise = exerciseData.get({
            plain: true
        });
        res.status(200).json(exercise);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all exercises for a pet
router.get('/bypet/:pet_id', async (req, res) => {
    try {
        const petId = req.params.pet_id;
        const exerciseData = await Exercise.findAll({
            where: {
                pet_id: petId,
            },
            order: [
                ['date', 'ASC']
            ],
        });

        const exercises = exerciseData.map((exercise) => exercise.get({
            plain: true
        }));
        res.status(200).json(exercises);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;