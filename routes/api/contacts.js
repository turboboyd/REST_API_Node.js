const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContact);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.putContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

module.exports = router;
