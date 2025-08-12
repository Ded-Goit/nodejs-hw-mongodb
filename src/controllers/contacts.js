import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contactsWithPagination = await getContacts({ page, perPage });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsWithPagination,
  });
};

export const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched a contact!',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'name, phoneNumber, and contactType are required',
    );
  }

  const newContact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const deleted = await deleteContact(req.params.contactId);

  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
