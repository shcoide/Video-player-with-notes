import React, { useRef } from 'react';
import YouTube from 'react-youtube';
import './player.css';

const VideoPlayer = ({ videoId, onTimeUpdate, playerRef }) => {
  const intervalId = useRef(null);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleReady = (event) => {
    event.target.pauseVideo();
    playerRef.current = event.target;
  };

  const handleStateChange = (event) => {
    if (event.data === 1) { // When the video is playing
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        onTimeUpdate(event.target.getCurrentTime());
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
  };

  return (
    <div className="player_box">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default VideoPlayer;
