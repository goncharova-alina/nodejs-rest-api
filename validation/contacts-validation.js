const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua'] },
    })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua'] },
    })
    .optional(),
  phone: Joi.string().min(9).max(15).optional(),
}).min(1);

const statusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Not Found',
    });
  }
  next();
};
module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateUpdateStatus = (req, res, next) => {
  return validate(statusUpdateSchema, req.body, next);
};