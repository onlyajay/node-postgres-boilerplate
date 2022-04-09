const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const userControllers = require('../controllers/users');
const bodyValidator = require("../middleware/bodyValidator");
const userDto = require('../dto/user.dto');
const router = express.Router();

router.get('/', checkAuth, userControllers.getAll);
router.post('/', checkAuth, bodyValidator(userDto), userControllers.create);
router.get('/:id', checkAuth, userControllers.getById);
router.put('/:id', checkAuth, userControllers.update);
router.delete('/:id', checkAuth, userControllers.remove);

module.exports = router;