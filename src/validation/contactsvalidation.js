import Joi from 'joi';

const stringRules = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: stringRules.required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: stringRules.required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(50).optional().messages({
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: stringRules
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: stringRules.optional(),
  phoneNumber: stringRules.optional(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: stringRules.valid('work', 'home', 'personal').optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

export const getContactsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.min': 'Page must be greater than or equal to {#limit}',
  }),
  perPage: Joi.number().integer().min(1).max(50).default(10).messages({
    'number.base': 'perPage must be a number',
    'number.min': 'perPage must be at least {#limit}',
    'number.max': 'perPage must be less than or equal to {#limit}',
  }),
  sortBy: Joi.string()
    .valid('name', 'email', 'contactType')
    .default('name')
    .messages({
      'any.only': 'sortBy must be one of: name, email, contactType',
    }),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc').messages({
    'any.only': 'sortOrder must be either asc or desc',
  }),
}).unknown(true);
