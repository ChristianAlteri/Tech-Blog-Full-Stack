const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  Post.findAll({
    include: [{ model: Comment }, { model: User }],
  })
    .then((posts) => {
      res.render('dashboard', {
        posts: posts.map((post) => post.get({ plain: true })),
        user: posts.user,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
