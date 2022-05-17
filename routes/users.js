const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/users');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidatior");
const createDto = require('../dto/user.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:id', checkAuth, controller.getById);
router.patch('/:id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);
router.post('/search-by-column', checkAuth, controller.searchByColumn);

module.exports = router;