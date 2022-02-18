const moment = require('moment')
const { AuthenticationError } = require('apollo-server-express');
const { User, Scores, Badge } = require('../models');
const { signToken } = require('../utils/auth');
const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require('graphql-upload');
const path = require('path');
const fs = require('fs');

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('scores').populate('friends').populate('badges');
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
      throw new AuthenticationError('Log in required');
    },
    //logged in users badges
    meBadges: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select('badges badgeCount').populate('badges');
      }
      throw new AuthenticationError('Log in required');
    },
    // all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('scores')
        .populate('badges')
        .sort({ wpm: -1 })
    },
    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('scores')
        .populate('friends')
        .populate('badges')
    },
    // get scores by username
    scoresByUser: async (parent, { username }) => {
      const params = { username };
      return Scores.find(params).sort({ 'wpm': -1 });
    },
    // get badges by username
    badgesByUser: async (parent, { username }) => {
      const params = { username };
      return Badge.find(params);
    },
    // all scores
    scores: async () => {
      return Scores.find().sort({ wpm: -1 });
    },
    badges: async () => {
      return Badge.find();
    },
    weeklyScores: async () => {
      const startDate = moment().startOf('week');
      const formatStartDate = moment(startDate).valueOf();
      return Scores.find({
        createdAt: { $gt: formatStartDate }
      })
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      console.log(args)
      const user = await User.create(
        args
      );
      const token = signToken(user)
      return {token, user}
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
      // log in streak logic
      const now = moment().format('DDD');
      const lastLog = moment(user.lastLog).format('DDD');
      // logged in twice in one day
      if (now === lastLog) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { lastLog: Date.now() } },
          { new: true }
        );
        // logged in 1 day after previous
      } else if (now - 1 === lastLog) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { lastLog: Date.now() }, $inc: { streak: 1 } },
          { new: true }
        );
      } else if (now === 1 && lastLog >= 364) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { lastLog: Date.now() }, $inc: { streak: 1 } },
          { new: true }
        );
        // logged in more than one day after previous
      } else {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { lastLog: Date.now() }, $set: { streak: 0 } },
          { new: true }
        );
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
    addLocation: async (parent, { location }, context) => {
      if (context.user) {
        const updatedlocation = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { location: location } },
          { new: true, runValidators: true }
        );

        return updatedlocation;
      }

      throw new AuthenticationError('Must be logged in');
    },

    addFriend: async (parent, { friendID }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendID } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, { friendID }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendID } },
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
          { $addToSet: { badges: badge } },
          { new: true }
        ).populate('badge');

        return badge;
      }

      throw new AuthenticationError('Could not add badge');
    },
    uploadFile: async (parent, { file }, context) => {

      if (context.user) {
        const { createReadStream, filename, mimetype, encoding } = await file;

        const stream = createReadStream()
        const pathName = path.join(__dirname, `../public/images/${filename}`)
        await stream.pipe(fs.createWriteStream(pathName))

        const url = `images/${filename}`

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profilePic: url } },
          { new: true }
        )
        return {
          url: `images/${filename}`
        }
      }
    },
  }
}



module.exports = resolvers;