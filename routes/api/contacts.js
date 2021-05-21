const express = require("express");
const controllerContacts = require("../../controllers/contacts-controllers");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contacts-validation");
const router = express.Router();

router.get("/", controllerContacts.getAll);

router.get("/:id", controllerContacts.getById);

router.post("/", validateCreateContact, controllerContacts.create);

router.delete("/:id", controllerContacts.remove);

router.put("/:id", validateUpdateContact, controllerContacts.update);

module.exports = router;
