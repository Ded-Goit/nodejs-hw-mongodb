//src/services/contacts.js
import { ContactCollection } from '../db/models/contact.js';
import mongoose from 'mongoose';

export const getContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  // Перевірка: чи це дійсний Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return null; // поводимося так, ніби не знайдено
  }

  const contact = await ContactCollection.findById(contactId);
  return contact;
};
