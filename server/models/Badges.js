const { Schema, model } = require('mongoose');

const badgesSchema = new Schema(
    {
        badge: {
            type: String,
            required: true
        },
       username: {
           type: String,
           required: true
        },
        earnedAt: {
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

const Badges = model('Badges', badgesSchema);

module.exports = Badges;