import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const TweetList = ({ tweetIds }) => {
  return (
    <div>
      {tweetIds.map((id) => (
        <div key={id} style={{ marginBottom: '20px' }}>
          <Tweet tweetId={id} />
        </div>
      ))}
    </div>
  );
};

export default TweetList;