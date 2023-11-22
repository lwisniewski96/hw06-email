const express = require("express");
const router = express.Router();
const contactsTasks = require("../controller/contacts");
const { bodyValidate } = require("../middlewares/Validate");

router.get("/", contactsTasks.listContacts);

router.get("/:contactId", contactsTasks.getContactById);

router.post(
  "/",
  bodyValidate(createContactSchema),
  contactsTasks.createContact
);

router.put(
  "/:contactId",
  bodyValidate(updateContactSchema),
  contactsTasks.updateContact
);

router.delete(
  "/:contactId",
  bodyValidate(deleteContactSchema),
  contactsTasks.removeContact
);

router.patch(
  "/:contactId/favorite",
  bodyValidate(updateStatusContactSchema),
  contactsTasks.updateStatusContact
);

module.exports = router;
