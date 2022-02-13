const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { Scores } = require('.');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    bio: {
      type: String,
      maxLength: 140,
      required: false,
    },
    location: {
      type: String,
      required: false
    },
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scores"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    badges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Badge"
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.virtual('scoreCount').get(function () {
  return this.scores.length;
});

userSchema.virtual('badgeCount').get(function () {
  return this.badges.length;
});

const User = model('User', userSchema);

module.exports = User;
