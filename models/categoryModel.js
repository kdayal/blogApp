// this code include database connection in file.
const db = require('../data/database');

async function getAllCategories() {
    try {
        const query = ` 
            SELECT * FROM categories
        `;
        const categories = await db.query(query)
        return categories;
     } catch (error) {
        console.log(error);
    }
}

async function addCategory(postData) {
    try {
        await db.query('INSERT INTO categories (name, description) VALUES(?)', [
            postData,
        ]);
    } catch (error) {
        console.log(error);
    }
}

async function getCategory(id) {
    try {
        const query = `
            SELECT * FROM categories WHERE id = ?
        `;
        const [categories] = await db.query(query, [id]);
        return categories;
    } catch(error) {
        console.log(error);
    }
}
async function updateCategory(category, id) {
    try {
        const query = `
            UPDATE categories SET name = ?, description = ?
            WHERE id = ? 
        `;

        await db.query(query, [category.name, category.description, id]);
    } catch (error) {
        console.log(error);
    }
}

async function deletCategory(id) {
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [id]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCategories , addCategory, updateCategory, deletCategory , getCategory
};


