const router = require('express').Router(); 

// Route for creating the new pet information 
router.post('/', async (req, res) => {
  try {
      // TODO
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for deleting the existing pet information
router.delete('/:id', async (req, res) => {
  try {
    //TODO
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
