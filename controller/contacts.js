const listContacts = require("./indexContacts");
const getContactById = require("./showContacts");
const createContact = require("./createContacts");
const updateContact = require("./updateContacts");
const deleteContact = require("./deleteContacts");

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
};
