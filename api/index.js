const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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

// HW04-AVATARS
// Konfiguracja Multer dla ładowania awataru do folderu avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/avatars"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", contactsTasks.listContacts);
router.get("/:contactId", contactsTasks.getContactById);
router.post(
  "/",
  bodyValidate(createContactSchema),
  contactsTasks.createContact
);
router.post(
  "/:contactId/upload-avatar",
  upload.single("avatar"),
  contactsTasks.uploadAvatar
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
