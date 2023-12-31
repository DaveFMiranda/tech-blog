const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Incoming POST requests lead to creation of a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Incoming POST requests to a specific blog lead to updating that post
router.post('/:id', withAuth, async (req, res) => {
  try {
    const updateBlog = await Blog.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Incoming DELETE requests to a specific blog lead to deleting that post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
