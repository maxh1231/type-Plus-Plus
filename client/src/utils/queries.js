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
            profilePic
            badges {
                badgeName
                xp
            }
        }
        scoresByUser(username: $username) {
          wpm
          accuracy
          createdAt
          username
        }
    }
`;

export const QUERY_USER_EMAIL = gql`
    query userByEmail($email: String!) {
        userByEmail(email: $email) {
            _id
            email
            question
            answer
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
            profilePic
            friends {
                _id
                username
                profilePic
            }
            scores {
                wpm
                accuracy
            }
            badges {
                badgeName
                description
                img
            }
            friendCount
            gameCount
            maxScore
            maxAccuracy
            age
            streak
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
                placeholder
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
            gameCount
            username
        }
    }
`
export const QUERY_WEEKLY_SCORES = gql`
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
        placeholder
        targetVal
        category
        }
    }
`

export const QUERY_USER_SCORE = gql`
    query ScoresByUser($username: String) {
    scoresByUser(username: $username) {
        wpm
        accuracy
        createdAt
    }
    }
`