// password protected 
const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      include: [{ model: Comment }],
    })
    .then((posts) => {
      res.render('dashboard', {
        posts: posts.map((post) => post.get({ plain: true })),
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.render('error');
    });
  });
  

module.exports = router;
