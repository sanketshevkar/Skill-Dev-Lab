const express = require('express');
const { validationResult } = require('express-validator');
const Tweet = require('../../models/Tweet');

const router = express.Router();

// @route    POST api/tweets
// @desc     Post tweet
// @access   Public
router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const url = req.body.tweetURL;
        const urlSplit = url.split('/');
        const id = urlSplit[urlSplit.length-1];
        const newTweet = new Tweet({
            tweetId: id,
            upVotes: 0,
            downVotes: 0
        });
        const tweet = await newTweet.save();
        res.json(tweet);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

// @route    GET api/tweets
// @desc     Get all tweets
// @access   Public
router.get('/', async (req, res) => {
    try{
        const tweets = await Tweet.find().sort({ date: -1 });
        res.json(tweets);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/tweets
// @desc     Delete tweet
// @access   Public
router.delete('/', async (req, res) => {
    try{
        const tweet = await Tweet.findById(req.body.tweetId);
        if (!tweet) {
        return res.status(404).json({ msg: 'Tweet not found' });
        }
        await tweet.remove();
        const tweets = await Tweet.find().sort({ date: -1 });
        res.json({ msg: 'Tweet removed' });
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

// @route    PUT api/tweets
// @desc     Put tweet upvote
// @access   Public
router.put('/upVote', async (req, res) => {
    try{
        const tweet = await Tweet.findById(req.body.tweetId);
        if (!tweet) {
        return res.status(404).json({ msg: 'Tweet not found' });
        }
        tweet.upVotes++;

        await tweet.save();
        res.json(tweet.upVotes);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

// @route    PUT api/tweets
// @desc     Put tweet downvote
// @access   Public
router.put('/downVote', async (req, res) => {
    try{
        const tweet = await Tweet.findById(req.body.tweetId);
        if (!tweet) {
        return res.status(404).json({ msg: 'Tweet not found' });
        }
        
        tweet.downVotes++;

        await tweet.save();
        res.json(tweet.downVotes);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

module.exports = router;