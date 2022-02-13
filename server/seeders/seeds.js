const db = require('../config/connection');
const Badge = require('../models/Badge');

db.once('open', async () => {
    await Badge.deleteMany({});

    const badgeData = [
        {badgeName: "Baby Gamer", Description: "", img: ""},
        {badgeName: "Noob Gamer"},
        {badgeName: "Gamer"},
        {badgeName: "Hardcore Gamer"},
        {badgeName: "Mega Gamer"}
    ];
    const createdBadges = await Badge.collection.insertMany(badgeData);

    console.log('Seeding complete');
    process.exit(0);
});