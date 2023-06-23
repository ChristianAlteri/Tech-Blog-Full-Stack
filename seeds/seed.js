// Import models

const { sequelize }  = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Import data files
const userDataArray = require('./userData.json');
const postDataArray = require('./postData.json');
const commentDataArray = require('./commentData.json');

async function seedDatabase() {
  // Synchronize Sequelize with your database models
  await sequelize.sync({ force: true });

  // Create an empty array to hold user objects
  const users = [];

  // Create new users in the database
  for (const userData of userDataArray) {
    const newUser = await User.create(userData);
    users.push(newUser);
  }

  // Create an empty array to hold post objects
  const posts = [];

  // Create new posts in the database
  for (const postData of postDataArray) {
    const randomUser = users.find(user => user.id === postData.user_id);
    const newPost = await Post.create({
      ...postData,
      userId: randomUser.id,
    });
    posts.push(newPost);
  }

  // Create comments in the database
  for (const commentData of commentDataArray) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    await Comment.create({
      ...commentData,
      user_id: randomUser.id,
      post_id: randomPost.id,
    });
  }

  // Exit the process with a status code of 0
  process.exit(0);
}

// Call the seedDatabase function
seedDatabase();
