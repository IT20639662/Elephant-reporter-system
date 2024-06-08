const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./route/user.route');
const postRoutes = require('./route/post.route');
const commentRoutes = require('./route/comment.route'); // Import comment routes
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://wildelephants00:wildEle00@cluster0.tpkoxxq.mongodb.net/wildelephantsdb'; // Update with your MongoDB connection string

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins

// CORS setup for specific origins
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes); // Include comment routes

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});