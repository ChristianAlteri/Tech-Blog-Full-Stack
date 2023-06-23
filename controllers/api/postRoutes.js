const router = require('express').Router();
const { Post } = require('../../models/');


router.post('/', async (req, res) => {
    try {
      const postData = await Post.create(req.body);
  
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