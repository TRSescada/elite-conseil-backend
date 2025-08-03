const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'AUTHOR', 'READER'],
        default: 'READER',
      },
      refreshToken: {
        type: String,
        default: null,
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
