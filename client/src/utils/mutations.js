import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BIO = gql`
  mutation addBio($bio: String!) {
    addBio(bio: $bio) {
      bio
      createdAt
  }
}
`

export const ADD_SCORE = gql`
  mutation addScore($wpm: Float!, $accuracy: Float!) {
    addScore(wpm: $wpm, accuracy: $accuracy) {
      wpm
      accuracy
    }
  }
`