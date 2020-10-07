import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbInstance";
import { useHistory } from "react-router-dom";
import Tweet from "components/Tweet";



export default ({ userObjs }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObjs.displayName);
  const [ownTweets, setOwnTweets] = useState([]);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObjs.displayName !== newDisplayName) {
      await userObjs.updateProfile({
          displayName: newDisplayName
      });
    }
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObjs.uid)
      .orderBy("createAt")
      .get();
      setOwnTweets(tweets.docs.map(doc => doc.data()))
  };
  useEffect(() => {
    getMyTweets();
  },);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className='profile_text'
          type="text"
          placeholder="닉네임을 입력하세요."
          onChange={onChange}
          value={newDisplayName}
        />
        <input className='profile_btn' type="submit" value="Update Nickname" />
      </form>
      <button className='profile_logout_btn'onClick={onLogOutClick}>Log Out</button>
     
      {ownTweets.map((tweet) => (
          <Tweet 
          key={tweet.createAt}
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObjs.uid}/>
        ))}
      <footer>sangjuntech copyright 2020.</footer>
    </>
  );
};
