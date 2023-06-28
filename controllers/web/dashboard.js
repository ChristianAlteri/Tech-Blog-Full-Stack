// password protected 
const session = require('express-session');
const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');
const { Cookie } = require('express-session');
const { Session } = require('express-session');

const router = require('express').Router();

router.get('/', (req, res) => {
// router.get('/', withAuth, (req, res) => {
  Post.findAll({
    include: [
      { model: Comment },
      { model: User }
    ],
  })
  .then((posts) => {
    // console.log(posts);
    // console.log(session);
    // console.log(User.name);

    console.log(posts);
    
    res.render('dashboard', {
      posts: posts.map((post) => post.get({ plain: true })),
        user: posts.user, 
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
