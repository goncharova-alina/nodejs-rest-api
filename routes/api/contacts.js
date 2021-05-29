const express = require('express');
const controllerContacts = require('../../controllers/contacts-controllers');
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../validation/contacts-validation');
const guard = require('../../helpers/guard');
const router = express.Router();

router.get('/', guard, controllerContacts.getAll);

router.get('/:id', guard, controllerContacts.getById);

router.post('/', guard, validateCreateContact, controllerContacts.create);

router.delete('/:id', guard, controllerContacts.remove);

router.put('/:id', guard, validateUpdateContact, controllerContacts.update);

router.patch(
  '/:id/favorite',
  guard,
  validateUpdateStatus,
  controllerContacts.updateStatus,
);

module.exports = router;