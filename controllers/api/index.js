const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Creating api endpoints

// localhost:3001/api/users...
router.use('/users', userRoutes);
// localhost:3001/api/comment...
router.use('/comment', commentRoutes);
// localhost:3001/api/post...
router.use('/post', postRoutes);

module.exports = router;