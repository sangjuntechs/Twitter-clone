import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";

const Home = ({userObjs}) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTweets(tweetArray)
    });
  },[])

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection('tweets').add({
        text:tweet,
        createAt:Date.now(),
        creatorId:userObjs.uid
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
          <h4>{tweet.text}</h4>
          </div>)}
      </div>
    </div>
  );
};

export default Home;
