const express = require('express');
const db = require('../data/database');
 
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', postController.getAllPosts);

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', { authors: authors });
});

router.post('/posts' , postController.postAction);
router.get('/posts/:id', postController.getPost);

router.get('/posts/:id/edit', async function(req, res) {
   const query = `
        SELECT * FROM posts where id = ?
   `; 

    const [posts] = await db.query(query, [req.params.id]);

    if (!posts || posts.length === 0){
        return res.status(404). render('404');
    }

    res.render ('update-post' , {post: posts[0]});
});


router.post('/posts/:id/edit' , postController.putAction);
router.post('/posts/:id/delete', postController.deletePost);

module.exports = router;
