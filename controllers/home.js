// displays log in page or redirects to sign up page

//  / display posts, comments, login signup buttons

//  /signup form to sign up a User

//   /login form to login. once logged in, nav to dashboard

const authenticate = require('../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
      include: [{ model: Comment }],
    })
    .then((posts) => {
      res.render('index', {
        posts: posts.map((post) => post.get({ plain: true })),
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.render('error');
    });
  });
  

module.exports = router;
