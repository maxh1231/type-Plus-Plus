import moment from 'moment';

export const formatTime = (date) => {
    let x = parseInt(date)
    return moment(x).format('MMMM Do');
}