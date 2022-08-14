const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');

router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategory);

// route to display new category form
router.get('/new-category', categoryController.addCategoryForm);
// route to handle the new category form submission
router.post('/category', categoryController.addCategory);

// route to display update category form
router.get('/category/:id/edit', categoryController.updateCategoryForm);
// route to handle the update category form submission
router.post('/category/:id/edit' , categoryController.updateCategory);

router.post('/category/:id/delete', categoryController.deleteCategory);

module.exports = router;

