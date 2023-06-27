const router = require('express').Router();
const { Comment, Post } = require('../../models/');


router.post('/', async (req, res) => {
  try {
      // Get the user ID from the session
    const userId = req.session.user_id;
    const post = await Post.findByPk(req.body.post_id);

    // Create the comment with the provided user ID
    const commentData = await Comment.create({
      ...req.body,
      user_id: userId,
   
      post_id: post.id,
    });
    console.log(commentData);
    res.redirect('/dashboard');
  } catch (err) {
    res.render('dashboard', {
      error: "Something went wrong",

    });
  }
});


  module.exports = router;