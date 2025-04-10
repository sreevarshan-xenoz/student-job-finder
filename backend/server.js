const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (using Memory Server for development)
async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Use MongoDB Atlas in production
      const MONGODB_URI = process.env.MONGODB_URI;
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB Atlas');
    } else {
      // Use MongoDB Memory Server for development
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Memory Server');
    }
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
}

connectDB();

// Routes
app.use('/api/jobs', require('./routes/jobs'));

// Health check route
app.get('/', (req, res) => {
  res.send('Student Job Tracker API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});