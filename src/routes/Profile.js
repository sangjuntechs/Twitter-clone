import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbInstance";
import { useHistory } from "react-router-dom";

export default ({ userObjs }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObjs.displayName);
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
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  },);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Nickname" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
