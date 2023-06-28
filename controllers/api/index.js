const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Creating api endpoints
router.use('/users', userRoutes);
router.use('/comment', commentRoutes)
router.use('/post', postRoutes);

module.exports = router;