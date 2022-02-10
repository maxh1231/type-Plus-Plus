import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            createdAt
            bio
            scores {
                wpm
                accuracy
                createdAt
                username
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            createdAt
            bio
            scores {
                wpm
                accuracy
                createdAt
                username
            }
            friends {
                _id
                username
            }
        }
        scoresByUser {
            wpm
            accuracy
            createdAt
        }
    }
`;

export const QUERY_MYSCORE = gql`
    query ScoresByUser {
        scoresByUser {
            wpm
            accuracy
            createdAt
        }
    }
`;
