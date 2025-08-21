import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactsvalidation.js';
import { authenticate } from '../middlewares/authenticate.js';
//import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', isValidId, getContactByIdController);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  createContactController,
);

contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContactController,
);
contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  deleteContactController,
);

export default contactsRouter;
