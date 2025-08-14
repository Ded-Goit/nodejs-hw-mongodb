import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page, perPage, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(totalCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
