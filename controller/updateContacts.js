const express = require("express");
const router = express.Router();
const { updateContact } = require("../service");
const { schema } = require("../Validators/updateContactsValidator");

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query;
  const { name, email, phone } = req.query;
  try {
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    const result = await updateContact(contactId, body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { updated: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
