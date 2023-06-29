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


// Get posts of specific user by name
// router.get('/user/:name', (req, res) => {
//   Post.findByPk(req.params.name, {
//     include: [{ model: Comment }, { model: User }],
//   }).then((name) => {
//     name = req.params 
//     console.log(name);
//     // console.log(data);
//   });
// });
router.get('/user/:name', (req, res) => {
  User.findOne({
    where: { name: req.params.name },
    include: [{ model: Post}, { model: Comment }],
  })
    .then((user) => {
      res.render('userDashboard', {
        // user: user,
        userPosts: user.posts.map((post) => post.get({ plain: true })),
        logged_in: req.session.logged_in,
      });
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});


module.exports = router;
