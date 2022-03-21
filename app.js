const express = require('express');
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

app.get('/', (req, res) => res.json({ msg: 'Welcome to contact keeper' }));

// /api/users ==>
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
