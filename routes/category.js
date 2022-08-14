const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategory);

router.get('/new-category', categoryController.addCategoryForm);
router.post('/category', categoryController.addCategory);

router.get('/category/:id/edit', categoryController.updateCategoryForm);
router.post('/category/:id/edit' , categoryController.updateCategory);

router.post('/category/:id/delete', categoryController.deleteCategory);

module.exports = router;

