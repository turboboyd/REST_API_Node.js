const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemas = require("../../models/contacts");


router.get("/", ctrl.getAllContacts);

// router.get("/:contactId", ctrl.getContact);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

// router.delete("/:contactId", ctrl.deleteContact);

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.putContact);

module.exports = router;
