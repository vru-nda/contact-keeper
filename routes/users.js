const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route ==> POST /api/users
// @desc ==> Register a user
// @access ==> Public
router.post(
  '/',
  [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg:errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    // find existing user
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User Already exist!' });
      }

      // create new user
      user = new User({
        name,
        email,
        password,
      });

      // encrypt password
      user.password = await bcrypt.hash(password, 12);
      await user.save();

      //userid to pass in the payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
