const express = require("express");
const router = express.Router();
const { getContact, deleteContact , createContact, upadteContact, getContactById } = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");

// As we wants all of our routes to be protected , so we can directly use it as router.use instead of applying individually to the routes
router.use(validateToken);
router.route('/')
.get(getContact)
.post(createContact);

router.route('/:id')
.put(upadteContact)
.delete(deleteContact)
.get(getContactById);



module.exports = router;