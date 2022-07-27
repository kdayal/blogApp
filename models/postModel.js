const db = require('../data/database');

async function getPosts() {
    try {
        const query = `
            SELECT 
                posts.*,
                authors.name AS authors_name 
            FROM posts
            INNER JOIN authors ON posts.author_id = authors.id
        `;
        const posts = await db.query(query);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

async function addPost(postData) {
    try {
        await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES(?)', [
            postData,
        ]);
    } catch (error) {
        console.log(error);
    }
}

async function getPost(id) {
    try {
        const query = `
            SELECT 
                posts. *, authors.name AS author_name, authors.email AS author_email 
            FROM posts
            INNER JOIN authors ON posts.author_id = authors.id
            WHERE posts.id = ?
        `;

        const [posts] = await db.query(query, [id]);
        return posts
    } catch(error) {
        console.log(error);
    }
}

async function updatePost(post, id) {
    try {
        const query = `
            UPDATE posts SET title = ?, summary = ?, body = ?
            WHERE id = ? 
        `;

        await db.query(query, [post.title, post.summary, post.content, id]);
    } catch (error) {
        console.log(error);
    }
}

async function deletePost(id) {
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [id]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPosts, addPost, getPost, updatePost, deletePost
};