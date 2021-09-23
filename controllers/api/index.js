const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const apptRoutes = require('./appointmentRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/appointments', apptRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/notes', noteRoutes);

module.exports = router;
