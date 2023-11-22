const express = require("express");
const router = express.Router();
const { listContacts } = require("../service");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
