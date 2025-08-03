//src/db/initMongoConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
};
