import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $question: String!, $answer: String!) {
    addUser(username: $username, email: $email, password: $password, question: $question, answer: $answer) {
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
        streak
        age
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
`;

export const ADD_SCORE = gql`
  mutation addScore($wpm: Float!, $accuracy: Float!) {
    addScore(wpm: $wpm, accuracy: $accuracy) {
      wpm
      accuracy
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendID: ID!) {
    addFriend(friendID: $friendID) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendID: ID!) {
    removeFriend(friendID: $friendID) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation AddLocation($location: String!) {
    addLocation(location: $location) {
      _id
      username
      email
      createdAt
      bio
      location
  }
}
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
  }
}
`;
export const ADD_BADGE = gql`
  mutation AddBadge($badgeName: String!) {
    addBadge(badgeName: $badgeName) {
      badgeName
      description
      img
      xp
    }
  }
`;