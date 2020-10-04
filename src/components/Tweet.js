import React, { useState } from "react";
import { dbService, storageService } from "fbInstance";
import {IoMdBuild , IoIosTrash} from 'react-icons/io'

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
    <div className="tweets">
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            {" "}
            <input className='edt_text' type="text" value={newTweet} required onChange={onChange} />
            <input className='edt_btn' type="submit" value="변경" />
          </form>
          <button className='edt_btn'onClick={onToggleEdit}>취소</button>
        </>
      ) : (
        <>
          <h3>{tweetObj.text}</h3>
          {tweetObj.fileAttachUrl && <img id='tweet_image'src={tweetObj.fileAttachUrl} alt='tweet_image'/>}
          <p className='tweetSmallFont'>
            {tweetObj.creatorName ? tweetObj.creatorName : "anonymous"}(
            {tweetObj.creatorEmail})
          </p>
          <p className='tweetSmallFont'>{tweetObj.createDay} {tweetObj.createTime}</p>
          {isOwner && (
            <>
              <button className='tweet_btn' onClick={onDeleteClick}><IoIosTrash /></button>
              <button className='tweet_btn' onClick={onToggleEdit}><IoMdBuild/></button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
