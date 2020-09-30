import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbInstance";
import Tweet from "components/Tweet";
import {v4 as uuidv4 } from 'uuid'

const Home = ({ userObjs }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [fileAttach, setFileAttach] = useState();

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    const toDate = new Date();
    let fileAttachUrl = '';
    event.preventDefault();
    if (fileAttach !== '') {
      const fileAttachRef = storageService.ref().child(`${userObjs.uid}/${uuidv4()}`);
    const response = await fileAttachRef.putString(fileAttach, "data_url")
    fileAttachUrl = await response.ref.getDownloadURL();

    }
    const tweetObj = {
      text: tweet,
      createAt: Date.now(),
      creatorId: userObjs.uid,
      creatorName: userObjs.displayName,
      creatorEmail: userObjs.email,
      createDay: toDate.toLocaleDateString(),
      createTime: toDate.toLocaleTimeString(),
      fileAttachUrl: fileAttachUrl
    }
    dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setFileAttach("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileAttach(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => {
    setFileAttach(null);
  }
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {fileAttach && (
          <div>
            <img src={fileAttach} width="50px" height="50px" />
            <button onClick={onClearPhotoClick}>Clear</button>
          </div>
        )}
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
