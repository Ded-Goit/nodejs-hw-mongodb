// src/server.js
import express from 'express';
import crypto from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import { getContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use([
    (req, res, next) => {
      req.id = crypto.randomUUID(); // генеруємо унікальний ID для запиту
      next();
    },
    pino(), // логер
    cors(), // підтримка CORS
    express.json(), // парсинг JSON
  ]);

  // GET /contacts — отримати всі контакти
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to fetch contacts',
        error: err.message,
      });
    }
  });

  // GET /contacts/:contactId — отримати контакт за ID
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to fetch contact by ID',
        error: err.message,
      });
    }
  });

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
