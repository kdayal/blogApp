const postModel = require('./../models/postModel');

async function getAllPosts(req, res) {
    const [posts] = await postModel.getPosts();
    res.render('posts-list', { posts : posts });
}

async function postAction(req, res) {
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    await postModel.addPost(data);
    res.redirect('/posts');
}

async function getPost(req, res) {
    const posts = await postModel.getPost(req.params.id);

    if (!posts || posts.length === 0) {
        return res.status(404). render('404');
    }

    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate: posts[0].date.toLocaleString('en-us',{
            weekday: 'long',
            year:'numeric',
            month: 'long',
            day:'numeric'
        })
    };
    res.render('post-detail', {post: postData});
}

async function putAction(req, res) {
    await postModel.updatePost({
        title: req.body.title, 
        summary: req.body.summary, 
        content: req.body.content, 
    }, req.params.id);
    res.redirect('/posts');
}

async function deletePost(req, res) {
    await postModel.deletePost(req.params.id);
    res.redirect('/posts');
}

module.exports = {
    getAllPosts, postAction, getPost, putAction, deletePost
};