const router = require('express').Router();
const { Comment } = require('../../models/');


router.post('/', async (req, res) => {
  try {
      // Get the user ID from the session
    const userId = req.session.user_id;

    // Create the post with the provided user ID
    const postData = await Post.create({
      ...req.body,
      user_id: userId
    });


    req.session.save(() => {
      req.session.user_id = postData.id;
      req.session.logged_in = true;

      res.status(200).json(postData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


  module.exports = router;