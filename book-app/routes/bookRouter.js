const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const errorWrap = require('../utils/errorWrap.js')

router.get('/', errorWrap.wrapper(bookController.getAllBooks));
router.get('/:id', errorWrap.wrapper(bookController.getBookById));
router.post('/', errorWrap.wrapper(bookController.createBook));
router.put('/:id', errorWrap.wrapper(bookController.updateBook));
router.delete('/:id', errorWrap.wrapper(bookController.deleteBook));

module.exports = router;
