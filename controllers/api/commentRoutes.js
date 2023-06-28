const router = require('express').Router();
const { Comment, Post } = require('../../models/');


router.post('/', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.user_id;
    const post = await Post.findByPk(req.body.post_id);

    // Check if the post exists
    if (!post) {
      console.log(`Post not found with id: ${req.body.post_id}`);
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create the comment with the provided user ID
    const commentData = await Comment.create({
      ...req.body,
      user_id: userId,
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.log(`Error creating comment: ${err}`);
    res.status(500).json({ error: "Something went wrong" });
  }
});


  module.exports = router;