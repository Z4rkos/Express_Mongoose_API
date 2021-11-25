const express = require('express');
const Post = require('../static/models/Post')


// Router for handeling everything relating to /posts.
const router = express.Router();

// Gets all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json(err);
    }
});

// Get a specific post by it's ID
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
    
});

// Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);    
    } catch (err) {
        res.json(err)
    }

    });

// Remove a specific post by it's ID
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch (err) {
        res.json(err)
    }
    
});

// Update the title of a specific post by it's ID
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}})
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
    }
    
});

// Update the description of a specific post by it's ID
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.description}})
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;