// password protected 
const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
// router.get('/', withAuth, (req, res) => {
    Post.findAll({
      include: [{ model: Comment }],
    })
    .then((posts) => {
      res.render('dashboard', {
        posts: posts.map((post) => post.get({ plain: true })),
        user: { name: user.name }, 
        // TODO: access the user name^^^
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
  });
  

module.exports = router;
