const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    createdAt: String!,
    bio: String
    scores: [Scores]
    friends: [User]
  }

  type Scores {
    _id: ID
    wpm: Float!
    accuracy: Float!
    username: String
    createdAt: String
  }
  
  type Badge {
    _id: ID!
    username: String
    createdAt: String    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    scores: [Scores]
    scoresByUser: [Scores]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addScore(wpm: Float!, accuracy: Float! ): Scores
    addBio(bio: String!): User
    addFriend(friendId: ID!): User
    addBadge(badge: String!, username: String!): Badge
  }
`;

module.exports = typeDefs;