const db = require('../config/connection');
const Badge = require('../models/Badge');

db.once('open', async () => {
    await Badge.deleteMany({});
    const badgeData = [
        // Games Played
        {badgeName: 'Baby Gamer', description: 'Played a Game', img: '/assets/badges/games-badge-1.png', targetVal: 1, category: 'games', xp: 10, createdAt: Date.now},
        {badgeName: 'Noob Gamer', description: 'Played 10 Games', img: '/assets/badges/games-badge-2.png', targetVal: 10, category: 'games', xp: 25, createdAt: Date.now},
        {badgeName: 'Average Gamer', description: 'Played 25 Games', img: '/assets/badges/games-badge-3.png', targetVal: 25, category: 'games', xp: 50, createdAt: Date.now},
        {badgeName: 'Hardcore Gamer', description: 'Played 50 Games', img: '/assets/badges/games-badge-4.png', targetVal: 50, category: 'games', xp: 100, createdAt: Date.now},
        {badgeName: 'Mega Gamer', description: 'Played 100 Games', img: '/assets/badges/games-badge-5.png', targetVal: 100, category: 'games', xp: 250, createdAt: Date.now},
        // Friends Added
        {badgeName: 'First Connection', description: 'Added a Friend', img: '/assets/badges/friends-badge-1.png', targetVal: 1, category: 'friends', xp: 10, createdAt: Date.now},
        {badgeName: 'Making Friends', description: 'Added 10 Friends', img: '/assets/badges/friends-badge-2.png', targetVal: 10, category: 'friends', xp: 25, createdAt: Date.now},
        {badgeName: 'Friendly', description: 'Added 25 Friends', img: '/assets/badges/friends-badge-3.png', targetVal: 25, category: 'friends', xp: 50, createdAt: Date.now},
        {badgeName: 'Socialite', description: 'Added 50 Friends', img: '/assets/badges/friends-badge-4.png', targetVal: 50, category: 'friends', xp: 100, createdAt: Date.now},
        {badgeName: 'Social Butterfly', description: 'Added 100 Friends', img: '/assets/badges/friends-badge-5.png', targetVal: 100, category: 'friends', xp: 250, createdAt: Date.now},
        // Score Achieved
        {badgeName: 'Typist', description: 'Scored 50 WPM', img: '/assets/badges/score-badge-1.png', targetVal: 50, category: 'scores', xp: 10, createdAt: Date.now},
        {badgeName: 'Average Typist', description: 'Scored 75 WPM', img: '/assets/badges/score-badge-2.png', targetVal: 75, category: 'scores', xp: 25, createdAt: Date.now},
        {badgeName: 'Speed Demon', description: 'Scored 100 WPM', img: '/assets/badges/score-badge-3.png', targetVal: 100, category: 'scores', xp: 50, createdAt: Date.now},
        {badgeName: 'Professional Typist', description: 'Scored 125 WPM', img: '/assets/badges/score-badge-4.png', targetVal: 125, category: 'scores', xp: 100, createdAt: Date.now},
        {badgeName: 'The Flash', description: 'Scored 150 WPM', img: '/assets/badges/score-badge-5.png', targetVal: 150, category: 'scores', xp: 250, createdAt: Date.now},
        // Accuracy 
        {badgeName: 'Sharp Shooter', description: 'Scored 80% Accuracy', img: '/assets/badges/accuracy-badge-1.png', targetVal: 80, category: 'accuracy', xp: 10, createdAt: Date.now},
        {badgeName: 'Precision Expert', description: 'Scored 90% Accuracy', img: '/assets/badges/accuracy-badge-2.png', targetVal: 90, category: 'accuracy', xp: 25, createdAt: Date.now},
        {badgeName: 'Perfect!', description: 'Scored 100% Accuracy', img: '/assets/badges/accuracy-badge-3.png', targetVal: 100, category: 'accuracy', xp: 50, createdAt: Date.now},
        // Log In Streak
        {badgeName: 'Return Customer', description: 'Logged In 2 Days in a Row', img: '/assets/badges/streak-badge-1.png', targetVal: 2, category: 'streak', xp: 10, createdAt: Date.now},
        {badgeName: 'Consistent', description: 'Logged In 5 Days in a Row', img: '/assets/badges/streak-badge-2.png', targetVal: 5, category: 'streak', xp: 25, createdAt: Date.now},
        {badgeName: 'Regular User', description: 'Logged In 10 Days in a Row', img: '/assets/badges/streak-badge-3.png', targetVal: 10, category: 'streak', xp: 50, createdAt: Date.now},
        {badgeName: 'Super Consistent', description: 'Logged In 25 Days in a Row', img: '/assets/badges/streak-badge-4.png', targetVal: 25, category: 'streak', xp: 100, createdAt: Date.now},
        {badgeName: 'Typing Addict', description: 'Logged In 50 Days in a Row', img: '/assets/badges/streak-badge-5.png', targetVal: 50, category: 'streak', xp: 250, createdAt: Date.now},
        // Account Age
        {badgeName: 'Happy Birthday', description: 'Account is 1 Year Old', img: '/assets/badges/age-badge-1.png', targetVal: 1, category: 'age', xp: 10, createdAt: Date.now},
        {badgeName: 'Getting Older', description: 'Account is 2 Years Old', img: '/assets/badges/age-badge-2.png', targetVal: 2, category: 'age', xp: 25, createdAt: Date.now},
        {badgeName: 'Long Time User', description: 'Account is 5 Years Old', img: '/assets/badges/age-badge-3.png', targetVal: 5, category: 'age', xp: 50, createdAt: Date.now},
        {badgeName: 'Old Timer', description: 'Account is 7 Years Old', img: '/assets/badges/age-badge-4.png', targetVal: 7, category: 'age', xp: 100, createdAt: Date.now},
        {badgeName: 'Geezer', description: 'Account is 10 Years Old', img: '/assets/badges/age-badge-5.png', targetVal: 10, category: 'age', xp: 250, createdAt: Date.now},
        // Secret
        {badgeName: 'Ooo, A Secret!', description: 'Become friends with the legendary Type++ developer, Thenlie', img: '/assets/badges/secret-1.png', xp: 250, createdAt: Date.now},
        {badgeName: 'Big Ben, Norse God Of Tailwind', description: 'Become friends with the legendary Type++ developer, Thorulfr', img: '/assets/badges/secret-2.png', xp: 250, createdAt: Date.now},
        {badgeName: 'McFriends', description: 'Become friends with the legendary Type++ developer, MaxH12-31', img: '/assets/badges/secret-3.png', xp: 250, createdAt: Date.now},
        {badgeName: "JFBC, We're Friends Now", description: 'Become friends with the legendary Type++ developer, T-Norm', img: '/assets/badges/secret-4.png', xp: 250, createdAt: Date.now},
        {badgeName: 'Thank you for playing', description: 'You collected every badge', img: '/assets/badges/crown.png', xp: 500, createdAt: Date.now},
    ];
    
    await Badge.collection.insertMany(badgeData);

    console.log('Seeding complete');
    process.exit(0);
});