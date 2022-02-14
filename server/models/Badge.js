const { Schema, model } = require('mongoose');

const badgeSchema = new Schema(
    {
        badgeName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
        },
        xp: {
            type: Number,
            required: true
        },
        targetVal: {
            type: Number,
        },
        category: {
            type: String,
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

const Badge = model('Badge', badgeSchema);

module.exports = Badge;