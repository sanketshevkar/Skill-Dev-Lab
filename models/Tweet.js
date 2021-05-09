const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  tweetId: {
    type: String
  },
  upVotes: {
      type: Number
  },
  downVotes: {
      type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('tweet', TweetSchema);