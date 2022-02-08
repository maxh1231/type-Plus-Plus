const { Schema, model } = require('mongoose');

const scoresSchema = new Schema(
    {
        wpm: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Scores = model('Scores', scoresSchema);

module.exports = Scores;