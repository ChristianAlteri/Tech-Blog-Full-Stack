const router = require('express').Router();
const { Post, Comment } = require('../../models/');

router.post('/', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.user_id;
    
    // Create the post with the provided user ID
    const postData = await Post.create({
      ...req.body,
      user_id: userId,
    });
    req.session.save(() => {
      req.session.user_id = userId;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({
      where: {
        id: postId
      }
    });
    res.render('update_form', {post});
    // console.log(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.update(
      {
        title: req.body.title, 
        body: req.body.body 
      },
      {
        where: { id: postId }
      }
    );
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // First, delete the associated comments
    await Comment.destroy({
      where: {
        post_id: postId
      }
    });

    // Then, delete the post
    await Post.destroy({
      where: {
        id: postId
      }
    });

    // res.redirect('/dashboard');
    // window.redirect("/dashboard")
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


module.exports = router;
