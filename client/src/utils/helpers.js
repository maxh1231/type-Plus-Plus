import moment from 'moment';

export const formatTime = (date) => {
    let x = parseInt(date);
    return moment(x).format('MMM. D, h:mm A');
};

export const checkGame = (val) => {
    if (val >= 100) {
        return 'Mega Gamer';
    } else if (val >= 50) {
        return 'Hardcore Gamer';
    } else if (val >= 25) {
        return 'Average Gamer';
    } else if (val >= 10) {
        return 'Noob Gamer';
    } else if (val >= 1) {
        return 'Baby Gamer';
    } else {
        return false;
    }
};

export const checkScore = (val) => {
    if (val > 150) {
        return [
            'The Flash',
            'Professional Typist',
            'Speed Demon',
            'Average Typist',
            'Typist',
        ];
    } else if (val >= 125) {
        return [
            'Professional Typist',
            'Speed Demon',
            'Average Typist',
            'Typist',
        ];
    } else if (val >= 100) {
        return ['Speed Demon', 'Average Typist', 'Typist'];
    } else if (val >= 75) {
        return ['Average Typist', 'Typist'];
    } else if (val >= 50) {
        return ['Typist'];
    } else {
        return false;
    }
};

export const checkAccuracy = (val) => {
    if (val === 100) {
        return ['Perfect!', 'Precision Expert', 'Sharp Shooter'];
    } else if (val > 90) {
        return ['Precision Expert', 'Sharp Shooter'];
    } else if (val > 80) {
        return ['Sharp Shooter'];
    } else {
        return false;
    }
};

export const checkFriends = (val) => {
    switch (val) {
        case 1:
            return 'First Connection';
        case 10:
            return 'Making Friends';
        case 25:
            return 'Friendly';
        case 50:
            return 'Socialite';
        case 100:
            return 'Social Butterfly';
        default:
            return false;
    }
};

export const checkStreak = (val) => {
    switch (val) {
        case 2:
            return 'Return Customer';
        case 5:
            return 'Consistent';
        case 10:
            return 'Regular User';
        case 25:
            return 'Super Consistent';
        case 50:
            return 'Typing Addict';
        default:
            return false;
    }
};

export const checkAge = (val) => {
    switch (val) {
        case 1:
            return 'Happy Birthday';
        case 2:
            return 'Getting Older';
        case 5:
            return 'Long Time User';
        case 7:
            return 'Old Timer';
        case 10:
            return 'Geezer';
        default:
            return false;
    }
};

export const checkLevelBadge = (val) => {
    switch (val) {
        case 1:
            return '/assets/level-icons/level-1.png';
        case 2:
            return '/assets/level-icons/level-2.png';
        case 3:
            return '/assets/level-icons/level-3.png';
        case 4:
            return '/assets/level-icons/level-4.png';
        case 5:
            return '/assets/level-icons/level-5.png';
        case 6:
            return '/assets/level-icons/level-6.png';
        case 7:
            return '/assets/level-icons/level-7.png';
        case 8:
            return '/assets/level-icons/level-8.png';
        case 9:
            return '/assets/level-icons/level-9.png';
        case 10:
            return '/assets/level-icons/level-10.png';
        default: 
            return null;
    }
};

export const checkLevel = (val) => {
    const level2 = 100;
    const level3 = 250;
    const level4 = 500;
    const level5 = 800;
    const level6 = 1200;
    const level7 = 1650;
    const level8 = 2100;
    const level9 = 2700;
    const level10 = 3200;
    let userLevel, levelProgress
    if (val < level2) {
        userLevel = 1
        levelProgress = (val / level2) * 100;
    } else if (val >= level2 && val < level3) {
        userLevel = 2;
        let diff = level3 - level2;
        let diff2 = val - level2;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level3 && val < level4) {
        userLevel = 3;
        let diff = level4 - level3;
        let diff2 = val - level3;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level4 && val < level5) {
        userLevel = 4;
        let diff = level5 - level4;
        let diff2 = val - level4;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level5 && val < level6) {
        userLevel = 5;
        let diff = level6 - level5;
        let diff2 = val - level5;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level6 && val < level7) {
        userLevel = 6;
        let diff = level7 - level6;
        let diff2 = val - level6;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level7 && val < level8) {
        userLevel = 7;
        let diff = level8 - level7;
        let diff2 = val - level7;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level8 && val < level9) {
        userLevel = 8;
        let diff = level9 - level8;
        let diff2 = val - level8;
        levelProgress = (diff2 / diff) * 100;
    } else if (val >= level9 && val < level10) {
        userLevel = 9;
        let diff = level10 - level9;
        let diff2 = val - level9;
        levelProgress = (diff2 / diff) * 100;
    } else {
        userLevel = 10;
        levelProgress = null;
    }
    return {levelProgress: levelProgress, userLevel: userLevel}
};