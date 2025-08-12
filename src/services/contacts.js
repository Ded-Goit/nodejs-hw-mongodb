import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const totalCount = await Contact.countDocuments();

  const contacts = await Contact.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder }) // додаємо сортування
    .exec();

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
