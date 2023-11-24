const express = require("express");
const router = express.Router();
const contactsTasks = require("../controllers/contacts");
const { bodyValidate } = require("../middlewares/validate");
const {
  createContactSchema,
} = require("../validators/createContactsValidator");

const {
  updateContactsSchema,
} = require("../validators/updateContactsValidator");

const { paramsValidate } = require("../middlewares/validateParams");

const {
  deleteContactsSchema,
} = require("../validators/deleteContactsValidator");

router.get("/", contactsTasks.listContacts);

router.get("/:contactId", contactsTasks.getContactById);

router.post(
  "/",
  bodyValidate(createContactSchema),
  contactsTasks.createContact
);

router.put(
  "/:contactId",
  bodyValidate(updateContactsSchema),
  contactsTasks.updateContact
);

router.delete(
  "/:contactId",
  paramsValidate(deleteContactsSchema),
  contactsTasks.deleteContact
);

module.exports = router;
