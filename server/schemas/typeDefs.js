const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    createdAt: String!
    bio: String
    location: String
    scoreCount: Int
    scores: [Scores]
    friendCount: Int
    friends: [User]
    badge: [Badge]
  }

  type Scores {
    _id: ID
    wpm: Float!
    accuracy: Float
    username: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Badge {
    _id: ID
    badgeName: String!
    description: String!
    img: String
    xp: Int
    createdAt: String   
  }

  type Query {
    me: User
    meScores: [Scores]
    users: [User]
    user(username: String!): User
    scoresByUser(username: String): [Scores]
    scores: [Scores]
    weeklyScores: [Scores]
    badge: [ Badge ]
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addScore(wpm: Float!, accuracy: Float! ): Scores
    addBio(bio: String!): User
    addLocation(location: String!): User
    addFriend(friendId: ID!): User
    addBadge(badgeName: String!): Badge
    createBadge(badgeName: String!): Badge
  }
`;

module.exports = typeDefs;
