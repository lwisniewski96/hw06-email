const Joi = require("joi");

const deleteContactsSchema = Joi.object({
  contactId: Joi.string().min(18).max(35).required(),
  phone: Joi.string().pattern(/[0-9]{9}/),
  favorite: Joi.bool(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});

module.exports = {
  deleteContactsSchema,
};
