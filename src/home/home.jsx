import React, { useState, useRef } from 'react';
import VideoPlayer from '../video/player';
import Notes from '../notes/notes';
import './home.css';

function Home() {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ'); // Default video ID
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const handleVideoChange = (event) => {
    setVideoId(event.target.value);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Video Player with Notes</h1>
        <input
          type="text"
          value={videoId}
          onChange={handleVideoChange}
          placeholder="Enter YouTube Video ID"
        />
        <VideoPlayer videoId={videoId} onTimeUpdate={setCurrentTime} playerRef={playerRef} />
        <Notes videoId={videoId} currentTime={currentTime} playerRef={playerRef} />
      </header>
    </div>
  );
}

export default Home;
