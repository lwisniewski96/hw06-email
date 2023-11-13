const express = require("express");
const Joi = require("joi");
const router = express.Router();

let contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  },
];

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", (req, res) => {
  res.json({ contacts, itemCount: contacts.length });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((el) => el.id === parseInt(id));

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(contact);
});

router.post("/", (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: `Validation error: ${error.message}` });
  }

  const { name, email, phone } = req.body;
  const id = contacts.length + 1;
  const contact = {
    id,
    name,
    email,
    phone,
  };

  contacts.push(contact);
  res.status(201).json(contact);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: `Validation error: ${error.message}` });
  }

  const contact = contacts.find((el) => el.id === parseInt(id));

  if (contact) {
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    res.status(200).json(contact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((el) => el.id === parseInt(id));

  if (index !== -1) {
    contacts.splice(index, 1);
    res.status(200).json({ message: "Contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
