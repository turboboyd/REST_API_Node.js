const Contact = require("../models/contacts");
const {  ctrlWrapper } = require("../helpers/index");
// HttpError,
const getAllContacts = async (req, res) => {
  const result = await Contact.find();

  res.json(result);
};

// const getContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   console.log('result: ', result);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Contact deleted",
//   });
// };

// const putContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContact: ctrlWrapper(getContact),
  postContact: ctrlWrapper(postContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // putContact: ctrlWrapper(putContact),
};
