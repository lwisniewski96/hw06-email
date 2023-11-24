const listContacts = require("./indexContacts");
const getContactById = require("./showContacts");
const createContact = require("./createContacts");
const updateContact = require("./updateContacts");
const deleteContact = require("./deleteContacts");

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
