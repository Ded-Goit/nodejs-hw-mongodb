import { Contact } from '../db/models/contact.js';

export const getContacts = () => {
  return Contact.find();
};

export const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = (contactId, updateData) => {
  return Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
