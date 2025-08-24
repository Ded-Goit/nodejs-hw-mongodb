import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  filter = {},
  sort,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (sort && sort.sortBy) {
    contactsQuery.sort({ [sort.sortBy]: sort.sortOrder });
  }

  const [totalCount, contacts] = await Promise.all([
    Contact.countDocuments(contactsQuery.getFilter()),
    contactsQuery.skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(totalCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const createContact = (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = (contactId, updateData, userId) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, updateData, {
    new: true,
  });
};

export const deleteContact = (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
