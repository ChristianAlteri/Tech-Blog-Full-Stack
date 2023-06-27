
const withAuth = require('../../middleware/authentication');
const { Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/')
    });
  } else {
    res.redirect('/')
  }
});

// router.get('/', (req, res) => {
//     res.redirect('/');
//   });

  module.exports = router