const Article = require('../models/Article');

// Create a new article
const createArticle = async (articleData) => {
    try {
        const article = new Article({
            title: articleData.title,
            content: articleData.content,
            imageUrl: articleData.imageUrl,
            tags: articleData.tags,
            author: articleData.author
        });
        const savedArticle = await article.save();
        return savedArticle;
    } catch (error) {
        throw error;
    }
};

// Get all articles
const getAllArticles = async () => {
    try {
        const articles = await Article.find({})
            .populate('author', 'username email')
            .populate('comments', 'content author')
            .sort({ createdAt: -1 });
        return articles;
    } catch (error) {
        throw error;
    }
};

// Get an article by ID
const getArticle = async (articleId) => {
    try {
        const article = await Article.findById(articleId)
            .populate('author', 'username email')
            .populate('comments', 'content author');
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    } catch (error) {
        throw error;
    }
};

// Update an article
const updateArticle = async (articleId, updateData) => {
    try {
        const article = await Article.findByIdAndUpdate(
            articleId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    } catch (error) {
        throw error;
    }
};

// Delete an article
const deleteArticle = async (articleId) => {
    try {
        const article = await Article.findByIdAndDelete(articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticle,
    updateArticle,
    deleteArticle
};
