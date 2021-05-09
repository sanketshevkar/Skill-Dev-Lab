import { useEffect, useState } from 'react';
import Tweet from './Tweet';

function TweetBoard() {
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/tweets')
        .then(response => response.json())
        .then(data =>{
            setTweets(data);
        });
    }, []);

    return(
        <div>
            {tweets.map((tweet) => <Tweet tweets={tweet} setTweets={setTweets} />)}      
        </div>
    );
}

export default TweetBoard;