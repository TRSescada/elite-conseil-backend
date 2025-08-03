const Comment = require('../models/Comment');

// Create a new comment
const createComment = async (commentData) => {
    try {
        const comment = new Comment({
            content: commentData.content,
            author: commentData.author,
            article: commentData.article
        });
        const savedComment = await comment.save();
        // Add comment ID to article's comments array
        await Article.findByIdAndUpdate(
            commentData.article,
            { $push: { comments: savedComment._id } }
        );
        return savedComment;
    } catch (error) {
        throw error;
    }
};

// Get all comments for an article
const getCommentsForArticle = async (articleId) => {
    try {
        const comments = await Comment.find({ article: articleId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });
        return comments;
    } catch (error) {
        throw error;
    }
};

// Get a comment by ID
const getComment = async (commentId) => {
    try {
        const comment = await Comment.findById(commentId)
            .populate('author', 'username email')
            .populate('article', 'title');
        if (!comment) {
            throw new Error('Comment not found');
        }
        return comment;
    } catch (error) {
        throw error;
    }
};

// Update a comment
const updateComment = async (commentId, updateData) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!comment) {
            throw new Error('Comment not found');
        }
        return comment;
    } catch (error) {
        throw error;
    }
};

// Delete a comment
const deleteComment = async (commentId) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }
        
        // Remove comment ID from article's comments array
        await Article.findByIdAndUpdate(
            comment.article,
            { $pull: { comments: commentId } }
        );
        
        await comment.deleteOne();
        return comment;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createComment,
    getCommentsForArticle,
    getComment,
    updateComment,
    deleteComment
};
