const listContacts = require("./indexContacts");
const getContactById = require("./showContacts");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const deleteContact = require("./deleteContact");

const service = require("../service");
const {
  schema: contactSchema,
  checkFavorite: checkFavoriteSchema,
} = require("../Validators/contactValidator");

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
