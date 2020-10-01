import React, { useState } from "react";
import { dbService, storageService } from "fbInstance";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("정말 이 트윗을 삭제하시겠습니까?");
    if (ok) {
      dbService.doc(`tweets/${tweetObj.id}`).delete();
      storageService.refFromURL(tweetObj.fileAttachUrl).delete();
    } else {
      return;
    }
  };

  const onToggleEdit = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            {" "}
            <input type="text" value={newTweet} required onChange={onChange} />
            <input type="submit" value="변경" />
          </form>
          <button onClick={onToggleEdit}>취소</button>
        </>
      ) : (
        <>
          <h3>{tweetObj.text}</h3>
          {tweetObj.fileAttachUrl && <img src={tweetObj.fileAttachUrl} width='100px' height='100px' alt='tweet_image'/>}
          <p>
            {tweetObj.creatorName ? tweetObj.creatorName : "anonymous"}(
            {tweetObj.creatorEmail})
          </p>
          <p>{tweetObj.createDay} {tweetObj.createTime}</p>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onToggleEdit}>Edit</button>
            </>
          )}
          <br />
        </>
      )}
    </div>
  );
};

export default Tweet;
