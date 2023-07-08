const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id }, // Add the condition to filter posts by the user's ID
    include: [{ model: Comment }, { model: User }],
  })
  .then((posts) => {
    const user = posts.length > 0 ? posts[0].User?.get({ plain: true }) : null;
    res.render('dashboard', {
      posts: posts.map((post) => post.get({ plain: true })),
      user: user,
      logged_in: req.session.logged_in,
    });
  
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});


router.get('/user/:name', (req, res) => {
  User.findOne({
    where: { name: req.params.name },
    include: [
      { 
        model: Post, 
        include: [
          {model: Comment,
          include: [
            {model: User}
          ]},
        ]
      }, 

    ],
  })
    .then((user) => {
      res.render('userDashboard', {
        userPosts: user.posts.map((post) => post.get({ plain: true })),
        logged_in: req.session.logged_in,
        user: user.dataValues,
      });
      console.log(user.posts.map((post) => post.get({ plain: true }))[0].comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});


module.exports = router;
