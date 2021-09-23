const router = require('express').Router();
const { Notes} = require('../../models');

// Route for creating the new note information
router.post('/', async (req, res) => {
    try {
        const note = await Notes.create({
            ...req.body
        });
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route for deleting the existing note information
router.delete('/:id', async (req, res) => {
    try {
        const noteData = await Notes.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!noteData) {
            res.status(404).json({
                message: 'No note found with this id!',
            });
            return;
        }

        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for updating the existing note information
router.put('/:id', async (req, res) => {
    try {
        const noteData = await Notes.update({
            ...req.body
        }, {
            where: {
                id: req.params.id,
            },
        }); 
        if (!noteData) {
            res.status(404).json({
                message: 'No note found with this id!',
            });
            return;
        }

        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get specfic note using the id
router.get('/:id', async (req, res) => {
    try {
        const noteData = await Notes.findByPk(req.params.id);
        if (!noteData) {
            res.status(404).json({
                message: 'No note found with this id!'
            });
            return;
        }

        const note = noteData.get({
            plain: true
        });
        res.status(200).json(note);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all notes for a pet
router.get('/bypet/:pet_id', async (req, res) => {
    try {
        const petId = req.params.pet_id;
        const noteData = await Notes.findAll({
            where: {
                pet_id: petId,
            },
            order: [
                ['date', 'ASC']
            ],
        });

        const notes = noteData.map((note) => note.get({
            plain: true
        }));
        res.status(200).json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;