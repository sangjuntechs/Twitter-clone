import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async() => {
      const dbTweets = await dbService.collection('tweets').get();
      dbTweets.forEach((document) => {
          const tweetObject = {
              ...document.data(),
              id:document.id
          }
          setTweets((prev) => [tweetObject, ...prev])
      })
  }
  useEffect(() => {
    getTweets();
  },[])

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection('tweets').add({
        tweet:tweet,
        createAt:Date.now()
    })
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="당신의 생각을 적으세요."
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
          {tweets.map(tweet => <div key={tweet.id}>
          <h4>{tweet.tweet}</h4>
          </div>)}
      </div>
    </div>
  );
};

export default Home;
