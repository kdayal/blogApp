const categoryModel = require('./../models/categoryModel');

async function getAllCategories(req, res) {
    const [categories] = await categoryModel.getAllCategories();
    console.log(categories);
    res.render('categories-list', { categories : categories });
}

async function addCategoryForm(req, res) {
    res.render('create-category', {});
}

async function addCategory(req, res) {
    const data = [
        req.body.name,
        req.body.description
    ];
    await categoryModel.addCategory(data);
    res.redirect('/categories')
}

async function getCategory(req, res) {
    const categories = await categoryModel.getCategory(req.params.id);

    if (!categories || categories.length === 0) {
        return res.status(404). render('404');
    }

    const categoryData = {
        ...categories[0],
        date: categories[0].date.toISOString(),
        humanReadableDate: categories[0].date.toLocaleString('en-us',{
            weekday: 'long',
            year:'numeric',
            month: 'long',
            day:'numeric'
        })
    };
    res.render('category-detail', {category: categoryData});
}

async function updateCategory(req, res) {
    await categoryModel.updateCategory({
        name: req.body.name, 
        description: req.body.description
    }, req.params.id);
    res.redirect('/categories');
}

async function deleteCategory(req, res) {
    await categoryModel.deletCategory(req.params.id);
    res.redirect('/categories');
}

async function updateCategoryForm(req, res) {
    const categories = await categoryModel.getCategory(req.params.id);
    if (!categories || categories.length === 0){
        return res.status(404).render('404');
    }
    res.render('update-category' , {category: categories[0]});
}

module.exports = {
 getAllCategories, addCategory, getCategory, 
 deleteCategory, updateCategoryForm, updateCategory,
 addCategoryForm
}
