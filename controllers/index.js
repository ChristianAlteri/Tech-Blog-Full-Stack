const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./web/home');
const dashboardRoutes = require('./web/dashboard');

router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);



module.exports = router;