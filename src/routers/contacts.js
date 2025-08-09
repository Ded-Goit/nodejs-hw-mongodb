import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
//import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', getContactByIdController);

contactsRouter.post('/contacts', createContactController);

contactsRouter.patch('/contacts/:contactId', updateContactController);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
