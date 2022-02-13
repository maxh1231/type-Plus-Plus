const db = require('../config/connection');
const Badge = require('../models/Badge');

db.once('open', async () => {
    await Badge.deleteMany({});
    const badgeData = [
        // Games Played
        {badgeName: 'Baby Gamer', description: 'Played a Game', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Noob Gamer', description: 'Played 10 Games', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Average Gamer', description: 'Played 25 Games', img: '', xp: 50, createdAt: Date.now},
        {badgeName: 'Hardcore Gamer', description: 'Played 50 Games', img: '', xp: 100, createdAt: Date.now},
        {badgeName: 'Mega Gamer', description: 'Played 100 Games', img: '', xp: 250, createdAt: Date.now},
        // Friends Added
        {badgeName: 'First Connection', description: 'Added a Friend', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Making Friends', description: 'Added 10 Friends', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Friendly', description: 'Added 25 Friends', img: '', xp: 50, createdAt: Date.now},
        {badgeName: 'Socialite', description: 'Added 50 Friends', img: '', xp: 100, createdAt: Date.now},
        {badgeName: 'Social Butterfly', description: 'Added 100 Friends', img: '', xp: 250, createdAt: Date.now},
        // Score Achieved
        {badgeName: 'Typist', description: 'Scored 50 WPM', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Average Typist', description: 'Scored 75 WPM', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Speed Demon', description: 'Scored 100 WPM', img: '', xp: 50, createdAt: Date.now},
        {badgeName: 'Professional Typist', description: 'Scored 125 WPM', img: '', xp: 100, createdAt: Date.now},
        {badgeName: 'The Flash', description: 'Scored 150 WPM', img: '', xp: 250, createdAt: Date.now},
        // Accuracy 
        {badgeName: 'Sharp Shooter', description: 'Scored 80% Accuracy', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Precision Expert', description: 'Scored 90% Accuracy', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Perfect!', description: 'Scored 100% Accuracy', img: '', xp: 50, createdAt: Date.now},
        // Log In Streak
        {badgeName: 'Return Customer', description: 'Logged In 2 Days in a Row', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Consistent', description: 'Logged In 5 Days in a Row', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Regular User', description: 'Logged In 10 Days in a Row', img: '', xp: 50, createdAt: Date.now},
        {badgeName: 'Super Consistent', description: 'Logged In 25 Days in a Row', img: '', xp: 100, createdAt: Date.now},
        {badgeName: 'Typing Addict', description: 'Logged In 50 Days in a Row', img: '', xp: 250, createdAt: Date.now},
        // Account Age
        {badgeName: 'Happy Birthday', description: 'Account is 1 Year Old', img: '', xp: 10, createdAt: Date.now},
        {badgeName: 'Getting Older', description: 'Account is 2 Years Old', img: '', xp: 25, createdAt: Date.now},
        {badgeName: 'Long Time User', description: 'Account is 5 Years Old', img: '', xp: 50, createdAt: Date.now},
        {badgeName: 'Old Timer', description: 'Account is 7 Years Old', img: '', xp: 100, createdAt: Date.now},
        {badgeName: 'Geezer', description: 'Account is 10 Years Old', img: '', xp: 250, createdAt: Date.now},
    ];
    const createdBadges = await Badge.collection.insertMany(badgeData);

    console.log('Seeding complete');
    process.exit(0);
});