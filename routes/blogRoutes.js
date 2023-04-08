const express = require('express');
const router = express.Router();
const { show_all, save, create, show_one, delete_one } = require('../controllers/blogController');

router.get('/', show_all);
router.post('/', save);
router.get('/criar', create);
router.get('/:id', show_one);
router.delete('/:id', delete_one);

module.exports = router;