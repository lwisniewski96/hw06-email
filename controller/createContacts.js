const express = require("express");
const router = express.Router();
const { createContact, listContacts } = require("../service");
const {
  createContactSchema,
} = require("../Validators/createContactsValidator");

router.post("/", async (req, res, next) => {
  const body = req.body;

  try {
    await createContactSchema.validateAsync(body);

    const contacts = await listContacts();
    const isNameUnique = !contacts.some((elem) => elem.name === body.name);
    if (!isNameUnique) {
      return res.status(400).json({
        status: "error",
        code: 400,
        data: { message: "You already have a contact with that name" },
      });
    } else {
      const result = await createContact(body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: { addedContact: result },
      });
    }
  } catch (error) {
    if (error.isJoi) {
      // Handle Joi validation errors
      return res.status(400).json({
        status: "error",
        code: 400,
        data: { message: error.details.map((err) => err.message) },
      });
    } else {
      console.error(error);
      // Handle other errors
      res.status(500).json({
        status: "fail",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }
});

module.exports = router;
