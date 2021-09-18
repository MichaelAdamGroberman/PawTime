const router = require('express').Router();
const apiRoutes = require('./api');
// Importing home routes
const homeRoutes = require('./homeRoutes');
// Adding home routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
