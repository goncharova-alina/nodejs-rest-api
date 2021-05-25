const express = require("express");
const controllerContacts = require("../../controllers/contacts-controllers");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require("../../validation/contacts-validation");
const router = express.Router();

router.get("/", controllerContacts.getAll);

router.get("/:id", controllerContacts.getById);

router.post("/", validateCreateContact, controllerContacts.create);

router.delete("/:id", controllerContacts.remove);

router.put("/:id", validateUpdateContact, controllerContacts.update);

router.patch(
  '/:id/favorite',
  validateUpdateStatus,
  controllerContacts.updateStatus,
);

module.exports = router;
