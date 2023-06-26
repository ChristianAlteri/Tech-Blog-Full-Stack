// password protected 
const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
// router.get('/', withAuth, (req, res) => {
    Post.findAll({
      include: [{ model: Comment }],
      include: [{ model: User }],
    })
    .then((posts) => {
      console.log(posts);
      res.render('dashboard', {
        posts: posts.map((post) => post.get({ plain: true })),
        // user: post.user, 
        // name: .name,
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
