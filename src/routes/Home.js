import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";
import Tweet from "components/Tweet";

const Home = ({ userObjs }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = (event) => {
    const toDate = new Date()
    event.preventDefault();
    dbService.collection("tweets").add({
      text: tweet,
      createAt: Date.now(),
      creatorId: userObjs.uid,
      creatorName: userObjs.displayName,
      creatorEmail: userObjs.email,
      createDay: toDate.toLocaleDateString(),
      createTime: toDate.toLocaleTimeString()
    });
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
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObjs.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
