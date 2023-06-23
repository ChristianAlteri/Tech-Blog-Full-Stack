const router = require('express').Router();
const { Post } = require('../../models/');


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
        req.session.user_id = user_id.id;
        req.session.logged_in = true;
  
        res.status(200).json(postData);
        // res.render('dashboard')
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Get a post by ID
// router.get('/post/:id', (req, res) => {
//   const postId = req.params.id;

//   Post.findByPk(postId, {
//     include: [User]
//   })
//     .then((post) => {
//       if (!post) {
//         res.status(404).json({ error: 'Post not found' });
//         return;
//       }

//       Post.findAll({
//         include: [User],
//       })
//         .then((posts) => {
//           res.render('home', {
//             posts: posts.map((p) => p.get({ plain: true })),
//             logged_in: req.session.logged_in,
//             current_post: {
//               title: post.title,
//               id: post.id,
//               body: post.body,
//               date_created: post.date_created,
//               user: post.user_id.name
//             }
//           });
//         })
//         .catch((err) => {
//           res.render('error');
//         });
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });


  module.exports = router;