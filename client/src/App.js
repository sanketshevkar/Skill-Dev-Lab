import React, { useState } from 'react';
import TweetBoard from './components/TweetBoard';
import { TextField, Button } from '@material-ui/core';

function App() {

  const [tweetURL, setTweetURL] = useState("");

  const onChangeHandler = (e) =>{
    e.preventDefault();
    setTweetURL(e.target.value)
  }

  const onClickHandler = (url) =>{
    fetch('http://localhost:5000/api/tweets', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tweetURL: tweetURL})
          })
        .then(response => response.json())
        .then(data => {
          alert(data.msg);
          window.location.reload();
        });
  }

  return (
    <div>
      <div style={{margin: "1rem"}}>
        <TextField
            style={{ margin: 8 }}
            placeholder="Tweet URL"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={tweetURL}
            onChange={(e)=>{onChangeHandler(e)}}
          />
        <Button variant="contained" onClick={()=>{onClickHandler(tweetURL)}}>Save URL</Button>

      </div>
      <TweetBoard />
    </div>
  );
}

export default App;
