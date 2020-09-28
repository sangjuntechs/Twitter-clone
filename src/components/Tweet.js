import React from "react";

const Tweet = ({ tweetObj, isOwner }) => (
  <div>
    <h3>{tweetObj.text}</h3>
    <p>
      {tweetObj.creatorName ? tweetObj.creatorName : "anonymous"}(
      {tweetObj.creatorEmail})
    </p>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>{" "}
      </>
    )}
    <br />
  </div>
);

export default Tweet;
