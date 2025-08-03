const express = require('express');
const router = express.Router();
const articleService = require('../services/articleService');

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new article
router.post('/', async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a single article
router.get('/:id', async (req, res) => {
    try {
        const article = await articleService.getArticle(req.params.id);
        res.json(article);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Update an article
router.put('/:id', async (req, res) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body);
        res.json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an article
router.delete('/:id', async (req, res) => {
    try {
        const article = await articleService.deleteArticle(req.params.id);
        res.json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
