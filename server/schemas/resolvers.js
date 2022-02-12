const { AuthenticationError } = require('apollo-server-express');
const { User, Scores, Badge } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('scores').populate('friends');
        return userData;
      }
      throw new AuthenticationError('Log in required');
    },
    // logged in users sorted scores
    meScores: async (parent, args, context) => {
      if (context.user) {
        const score = await Scores.find({ ...args, username: context.user.username }).sort({ 'wpm': -1 })

        return score;
      }
    },
    // all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('scores')
        .populate('badge')
        .sort({ wpm: -1 })
    },
    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('scores')
        .populate('friends')
    },
    // get scores by username
    scoresByUser: async (parent, { username }) => {
      const params = { username };
      return Scores.find(params).sort({ 'wpm': -1 });
    },
    // all scores
    scores: async () => {
      return Scores.find().sort({ wpm: -1 });
    },

    badge: async () => {
      return Badge.find();
    },

  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addScore: async (parent, args, context) => {
      if (context.user) {
        const score = await Scores.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { scores: score._id } },
          { new: true }
        );

        return score;
      }
    },
    addBio: async (parent, { bio }, context) => {
      if (context.user) {
        const updatedBio = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { bio: bio } },
          { new: true, runValidators: true }
        );

        return updatedBio;
      }

      throw new AuthenticationError('Must be logged in');
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    createBadge: async (parent, args) => {
      const badge = await Badge.create(args);
      return badge;
    },

    addBadge: async (parent, { badgeName }, context) => {
      if (context.user) {
        const badge = await Badge.findOne({ badgeName });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { badge: badge }},
          { new: true }
        ).populate('badge');

        return badge;
      }

      throw new AuthenticationError('Could not add badge');
    },
  }
}



module.exports = resolvers;