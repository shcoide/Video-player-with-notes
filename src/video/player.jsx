import React from 'react';
import YouTube from 'react-youtube';
import './player.css';

const VideoPlayer = ({ videoId, onTimeUpdate, playerRef }) => {
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
      const intervalId = setInterval(() => {
        onTimeUpdate(event.target.getCurrentTime());
      }, 1000);

      // Clear interval on video pause/stop
      event.target.addEventListener('onStateChange', (newEvent) => {
        if (newEvent.data !== 1) {
          clearInterval(intervalId);
        }
      });
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
