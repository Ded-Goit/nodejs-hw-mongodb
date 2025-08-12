import Joi from 'joi';

const stringRules = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: stringRules.required(),
  phoneNumber: stringRules.required(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: stringRules.valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: stringRules.optional(),
  phoneNumber: stringRules.optional(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: stringRules.valid('work', 'home', 'personal').optional(),
}).min(1);
