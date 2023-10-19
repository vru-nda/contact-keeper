const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const Contact = require("../models/Contact");
const isAuth = require("../middleware/auth");

// @route ==> GET /api/contacts
// @desc ==> Get all users contacts
// @access ==> Private
router.get("/", isAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route ==> POST /api/contacts
// @desc ==> add new contacts
// @access ==> Private
router.post(
  "/",
  [isAuth, [check("name", "Name is required.").not().isEmpty()]],
  [
    isAuth,
    [
      check("phone", "Phone number is required.").not().isEmpty(),
      check(
        "phone",
        "Please enter a phone number with 10 characters."
      ).isLength({min: 10}),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg: errors.array()[0].msg});
    }
    const {name, email, phone, type} = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route ==> PUT /api/conctacts/:id
// @desc ==> update contact
// @access ==> Private
router.put(
  "/:id",
  isAuth,
  [
    isAuth,
    [
      isAuth,
      [
        check(
          "phone",
          "Please enter a phone number with 10 characters."
        ).isLength({min: 10}),
      ],
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({msg: errors.array()[0].msg});
    }

    const {name, email, phone, type} = req.body;

    // build a contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({msg: "Contact not found!"});
      }
      // authorization
      if (contact.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({msg: "Not authorized!"});
      }

      updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        {$set: contactFields},
        {new: true}
      );
      res.json(updatedContact);
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error!");
    }
  }
);

// @route ==> DELETE /api/conctacts/:id
// @desc ==> Delete contact
// @access ==> Private
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({msg: "Contact not found!"});
    }
    // authorization
    if (contact.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({msg: "Not authorized!"});
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg: "Contact Deleted"});
  } catch (err) {
    console.error(err);
    res.status(400).send("Server Error!");
  }
});

module.exports = router;
