const express = require('express');
const router = express.Router();
const commentService = require('../services/commentService');

// Get all comments for an article
router.get('/article/:articleId', async (req, res) => {
    try {
        const comments = await commentService.getCommentsForArticle(req.params.articleId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a single comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await commentService.getComment(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.body);
        res.json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await commentService.deleteComment(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
