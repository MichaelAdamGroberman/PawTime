const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const apptRoutes = require('./appointmentRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/appointments', apptRoutes);

module.exports = router;
