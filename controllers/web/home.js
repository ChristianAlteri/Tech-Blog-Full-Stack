// displays log in page or redirects to sign up page

//  / display posts, comments, login signup buttons

//  /signup form to sign up a User

//   /login form to login. once logged in, nav to dashboard

const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

// Get landing page
router.get('/', (req, res) => {
    Post.findAll({
      include: [User],
    })
    .then((posts) => {
      res.render('home', {
        posts: posts.map((post) => post.get({ plain: true })),
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.render('error');
    });
});





// Show login form & sign up
router.get('/login', (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in,
  });
});

// Login form
router.post('/login', async (req, res) => {
  try {
    const userData = await User.user.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.render('login', {
        error: 'Incorrect email or password, please try again',
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.render('login', {
        error: 'Incorrect email or password, please try again',
      });
      return;
    }
    console.log('Login working');
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



// Sign up
router.get('/signup', (req, res) => {
  res.render('signup', {
    logged_in: req.session.logged_in,

  });
})


router.post('/signup', async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/dashboard')
    });
  } catch (err) {
    res.render('signup', {
      error: "Something went wrong"
    });
  }
})

module.exports = router;
