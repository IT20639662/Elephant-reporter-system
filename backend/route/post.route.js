// post.route.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Post = require('../model/post.model'); // Assuming you have a Post model
const User = require('../model/user.model');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, time, venue, weather, description, location, userId } = req.body;
    const image = req.file ? req.file.path : ''; // Get image URL from multer

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if the user is logged in
    const loggedInUser = await User.findById(userId);
    if (!loggedInUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new Post({
      title,
      category,
      time,
      venue,
      weather,
      description,
      location,
      userId,
      image, // Add image URL to the post data
    });
    await newPost.save();

    // Send email if the category is "Injured"
    if (category === 'Injured') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wildelephants00@gmail.com',
          pass: 'ztnd uwuc wbdz uoew',
        },
      });

      const mailOptions = {
        from: 'wildelephants00@gmail.com',
        to: loggedInUser.email,
        cc: 'wildelephants00@gmail.com',
        subject: 'New Post Created - Injured Elephant',
        text: `Hello ${loggedInUser.username},\n\nA new post about an injured elephant has been created with the following details:\n\nTitle: "${newPost.title}"\nPost ID: ${newPost.id}\n\nUser Information:\nID: ${loggedInUser._id}\nUsername: ${loggedInUser.username}\nEmail: ${loggedInUser.email}\nCity: ${loggedInUser.city}\nContact Number: ${loggedInUser.cnumber}\nPassword: ${loggedInUser.password}\nCreated At: ${loggedInUser.createdAt}\n\nThank you for using our platform!\n\nBest regards,\nAssignmentSaga Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email send error:', error);
          res.status(500).json({ message: 'Failed to send email' });
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all posts by user ID
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/getall', async (req, res) => {
  try {
    const { userId } = req.query;
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.get('/:userId/count', async (req, res) => {
    try {
      const userId = req.params.userId;
      const postCount = await Post.countDocuments({ userId }); // Count posts where userId matches
  
      res.status(200).json({ count: postCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Update post by ID
  router.put('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, category, time, venue, weather, description } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        title,
        category,
        time,
        venue,
        weather,
        description
      }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Delete post by ID
  router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;