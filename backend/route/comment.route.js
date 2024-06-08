const express = require('express');
const router = express.Router();
const Comment = require('../model/comment.model');

// Add a comment
router.post('/', async (req, res) => {
  try {
    const { postId, comment, userId } = req.body;
    if (!postId || !comment || !userId) {
      return res.status(400).json({ message: 'Post ID, comment, and user ID are required' });
    }

    const newComment = new Comment({
      postId,
      comment,
      userId,
    });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get comments by post ID
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;