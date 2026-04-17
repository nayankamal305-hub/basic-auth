require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

// Check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in environment variables. Database will not connect.');
} else {
  // Database Connection
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.error('Make sure your MongoDB Atlas Network Access is set to allow all IPs (0.0.0.0/0)');
    });
}
