const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;
