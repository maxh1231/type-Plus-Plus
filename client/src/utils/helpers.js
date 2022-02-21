import moment from 'moment';

export const formatTime = (date) => {
    let x = parseInt(date);
    return moment(x).format('MMM. D, h:mm A');
};

export const checkGame = (val) => {
    switch (val) {
        case 1:
            return 'Baby Gamer';
        case 10:
            return 'Noob Gamer';
        case 25:
            return 'Average Gamer';
        case 50:
            return 'Hardcore Gamer';
        case 100:
            return 'Mega Gamer';
        default:
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
    } else if (val > 125) {
        return [
            'Professional Typist',
            'Speed Demon',
            'Average Typist',
            'Typist',
        ];
    } else if (val > 100) {
        return ['Speed Demon', 'Average Typist', 'Typist'];
    } else if (val > 75) {
        return ['Average Typist', 'Typist'];
    } else if (val > 50) {
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
