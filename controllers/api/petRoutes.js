const router = require('express').Router();
const { Pet } = require('../../models');

// Route for creating the new pet information
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const pet = await Pet.create({
      name: req.body.petName,
      gender: req.body.petGender,
      type: req.body.petType,
      breed: req.body.petBreed,
      user_id: req.session.user_id,
    });

    if (req.session.user_id) {
      res.redirect('/profile');
      return;
    }

    res.status(200).json(pet);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route for deleting the existing pet information
router.delete('/:id', async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!petData) {
      res.status(404).json({
        message: 'No pet found with this id!',
      });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for updating the existing appointment information
router.put('/:id', async (req, res) => {
  try {
      const petData = await Pet.update({
          ...req.body
      }, {
          where: {
              id: req.params.id,
          },
      }); 
      if (!petData) {
          res.status(404).json({
              message: 'No pet found with this id!',
          });
          return;
      }
      res.status(200).json(petData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Route for getting the pet by id
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      res.status(404).json({ message: 'No pet with this id!' });
      return;
    }

    const petData = pet.get({ plain: true });
    res.status(200).json(petData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for getting all pets for a specific user id
router.get('/byuser/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const pets = await Pet.findAll({
      where: {
        user_id: userId,
      },
      order: [['name', 'ASC']],
    });

    const petsData = pets.map((pet) => pet.get({ plain: true }));
    res.status(200).json(petsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
