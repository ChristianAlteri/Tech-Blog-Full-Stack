const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./web/home');
const dashboardRoutes = require('./web/dashboard');
const logoutRoutes = require('./web/logout');



router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/logout', logoutRoutes);



module.exports = router;