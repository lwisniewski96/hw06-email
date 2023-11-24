const listContacts = require("./indexContacts");
const getContactById = require("./showContacts");
const createContact = require("./createContacts");
const updateContact = require("./updateContacts");
const deleteContact = require("./deleteContacts");
// Import nowo utworzonego pliku obsługującego ładowanie awataru
const uploadAvatar = require("./uploadAvatar");

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  uploadAvatar,
};
