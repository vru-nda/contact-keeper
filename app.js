const express = require('express');
const path = require('path');
require('dotenv').config()
const connectDb = require('./config/db');

const usersRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');

const app = express();

// connect to DB
connectDb();

//init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// /api/users ==>
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
