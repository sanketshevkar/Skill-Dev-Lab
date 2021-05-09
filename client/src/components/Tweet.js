import { useState } from 'react';
import TweetEmbed from 'react-tweet-embed';
import { IconButton, Divider } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Tweet(props) {

    const [upVotes, setUpVotes] = useState(props.tweets.upVotes);
    const [downVotes, setDownVotes] = useState(props.tweets.downVotes);

    const upVoteHandler = (objectId) =>{
        fetch('http://localhost:5000/api/tweets/upVote', {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweetId: objectId})
          })
        .then(response => response.json())
        .then(data => setUpVotes(data));
    }

    const downVoteHandler = (objectId) =>{
        fetch('http://localhost:5000/api/tweets/downVote', {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweetId: objectId})
          })
        .then(response => response.json())
        .then(data => setDownVotes(data));
    }

    const deleteHandler = (objectId) =>{
        fetch('http://localhost:5000/api/tweets', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweetId: objectId})
          })
        .then(response => response.json())
        .then(data => {
            alert(data.msg);
            window.location.reload();
        });
    }

    return(
        <div style={{marginBottom: "5rem"}}>
            <div>
                <Divider />
            </div >
            <div style={{
            left: '50%',
            marginLeft: '350px'}}>
            <TweetEmbed id={props.tweets.tweetId} />
            <div style={{float: 'left'}}>
                <IconButton aria-label="delete" size="medium" onClick={()=> upVoteHandler(props.tweets._id)} >
                    <ArrowUpwardIcon />{upVotes}
                </IconButton>
                <IconButton aria-label="delete" size="medium" onClick={()=> downVoteHandler(props.tweets._id)} >
                    <ArrowDownwardIcon />{downVotes}
                </IconButton>
                <IconButton aria-label="delete" size="medium" onClick={()=> deleteHandler(props.tweets._id)} >
                    <DeleteIcon />
                </IconButton>
                {/* <span className="MuiButton-root">{props.tweets.timeStamp.getDate()}-{props.tweets.timeStamp.getMonth()}-{props.tweets.timeStamp.getFullYear()}  {props.tweets.timeStamp.getHours()}:{props.tweets.timeStamp.getMinutes()} HRS</span> */}
                <span className="MuiIconButton-root">{props.tweets.date}</span>
            </div>
            </div>
        </div>
    );
}