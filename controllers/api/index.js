const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const apptRoutes = require('./appointmentRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const noteRoutes = require('./noteRoutes');
const vaccinationRoutes = require('./vaccinationRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/appointments', apptRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/notes', noteRoutes);
router.use('/vaccinations', vaccinationRoutes);

module.exports = router;

