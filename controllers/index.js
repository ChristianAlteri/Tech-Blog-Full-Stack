const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/home');
router.use('/dashboard');



module.exports = router;