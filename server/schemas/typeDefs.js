const { gql } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String!
    email: String!
    createdAt: String!
    bio: String
    location: String
    profilePic: String
    streak: Int
    lastLog: String
    scores: [Scores]
    gameCount: Int
    maxScore: Float
    friends: [User]
    friendCount: Int
    badges: [Badge]
    badgeCount: Int
    maxAccuracy: Float
    age: Int
    question: String
    answer: String
  }

  type Scores {
    _id: ID
    wpm: Float
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
    placeholder: String
    xp: Int
    targetVal: Int
    createdAt: String
    category: String   
  }

  type File {
    url: String
  }

  type Query {
    me: User
    meScores: [Scores]
    users: [User]
    user(username: String!): User
    userByEmail(email: String!): User
    scoresByUser(username: String): [Scores]
    badgesByUser(username: String): [Badge]
    scores: [Scores]
    weeklyScores: [Scores]
    badges: [ Badge ]
    meBadges: User
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, question: String!, answer: String!): Auth
    addScore(wpm: Float!, accuracy: Float! ): Scores
    addBio(bio: String!): User
    addLocation(location: String!): User
    addFriend(friendID: ID!): User
    removeFriend(friendID: ID!): User
    addBadge(badgeName: String!): Badge
    createBadge(badgeName: String!): Badge
    uploadFile(file: Upload!): File!
  }
`;

module.exports = typeDefs;
