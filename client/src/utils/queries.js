import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            createdAt
            bio
            location
        }
        scoresByUser(username: $username) {
          wpm
          accuracy
          createdAt
          username
        }
        
    }
`;


// query logged in user's information and scores sorted by WPM
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            createdAt
            bio
            location
            friends {
                _id
                username
            }
            friendCount
            gameCount
            maxScore
            maxAccuracy
            age
        }
        meScores {
            wpm
            accuracy
            createdAt
        }
        meBadges {
            badges {
                badgeName
                description
                img
                xp
                targetVal
                createdAt
                _id
            }   
            badgeCount
        }
    }
`;

export const QUERY_FRIENDS = gql`
    {
        me {
            username
            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_SCORES = gql`
    query Scores {
        scores {
            wpm
            accuracy
            username
            createdAt
        }
    }
`

// query logged in user's scores sorted by date (for chart)
export const QUERY_MYSCORE = gql`
    query meScores {
        meScores {
            wpm
            accuracy
            createdAt
        }
    }
`;

export const QUERY_MYBADGE = gql`
    query MeBadges {
        meBadges {
            badges {
                _id
                badgeName
                description
                img
                xp
                targetVal
                createdAt
            }   
            badgeCount
        }
    }
`;

export const QUERY_SCORE_COUNT = gql`
    query Users {
        users {
            scoreCount
            username
        }
    }
`
export const QUERY_WEEKLY_SCORES = gql `
    query WeeklyScores {
        weeklyScores {
        wpm
        createdAt
        username
        accuracy
        }
    }
`

export const QUERY_BADGES = gql`
    query Badge {
        badges{
        _id
        badgeName
        description
        xp
        createdAt
        img
        targetVal
        category
        }
    }
`