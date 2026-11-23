
import './App.css';
import { useRef, useState } from 'react';
import { playlists } from './data';
import TrackList from './TrackList';

import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  SkipBack,
  Play,
  SkipForward,
  Volume2,
  Pause
} from 'lucide-react';

// Sidebar navigation
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">♫ Spotify</h2>

      <nav className="main-nav">
        <a href="#" className="active">
          <Home size={22} />
          <span>Home</span>
        </a>

        <a href="#">
          <Search size={22} />
          <span>Search</span>
        </a>

        <a href="#">
          <Library size={22} />
          <span>Your Library</span>
        </a>
      </nav>

      <div className="library-actions">
        <a href="#">
          <Plus size={20} />
          <span>Create Playlist</span>
        </a>

        <a href="#">
          <Heart size={20} />
          <span>Liked Songs</span>
        </a>
      </div>
    </aside>
  );
}

// Top navigation
function TopBar() {
  return (
    <header className="topbar">
      <div className="navigation-buttons">
        <button>‹</button>
        <button>›</button>
      </div>

      <div className="user-actions">
        <button className="upgrade-btn">Explore Premium</button>
        <button className="profile-btn">A</button>
      </div>
    </header>
  );
}

// Playlist section
function PlaylistSection({
  selectedPlaylist,
  onSelectPlaylist,
  onSelectTrack
}) {
  return (
    <section className="playlist-section">
      <h1>Good afternoon</h1>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div className="track-section">
          <h2>{selectedPlaylist.title}</h2>
          <p>{selectedPlaylist.description}</p>

          <TrackList
            tracks={selectedPlaylist.tracks}
            onTrackSelect={onSelectTrack}
          />
        </div>
      )}
    </section>
  );
}

// Music player
function PlayerBar({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  currentTime,
  duration,
  onSeek
}) {
  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };
  return (
    <footer className="player-bar">
      <div className="track-info">
        <div className="track-cover">♫</div>

        <div>
  <h4>{currentTrack ? currentTrack.title : 'No track selected'}</h4>
  <p>{currentTrack ? currentTrack.artist : 'Unknown Artist'}</p>
</div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button onClick={onPreviousTrack}>
  <SkipBack size={20} />
</button>

<button className="play-button" onClick={onPlayPause}>
  {isPlaying ? (
    <Pause size={20} fill="black" />
  ) : (
    <Play size={20} fill="black" />
  )}
</button>

<button onClick={onNextTrack}>
  <SkipForward size={20} />
</button>
        </div>

        <div className="progress-container">
  <span>{formatTime(currentTime)}</span>

  <input
    type="range"
    className="progress-slider"
    min="0"
    max={duration || 0}
    value={currentTime}
    onChange={onSeek}
    disabled={!duration}
  />

  <span>{formatTime(duration)}</span>
</div>
      </div>

      <div className="volume-control">
        <Volume2 size={20} />
        <div className="volume-track"></div>
      </div>
    </footer>
  );
}

// Main application
function App() {
  const audioRef = useRef(null);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Select and play a track
  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = track.audio;

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Unable to play audio:', error);
          setIsPlaying(false);
        });
    }
  };

  // Play and pause audio
  const handlePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Unable to play audio:', error);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

    const handleNextTrack = () => {
    if (!selectedPlaylist || !currentTrack) return;

    const tracks = selectedPlaylist.tracks;
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );

    const nextIndex = (currentIndex + 1) % tracks.length;

    handleTrackSelect(tracks[nextIndex]);
  };

    const handlePreviousTrack = () => {
    if (!selectedPlaylist || !currentTrack) return;

    const tracks = selectedPlaylist.tracks;
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );

    const previousIndex =
      currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;

    handleTrackSelect(tracks[previousIndex]);
  };

  const handleSeek = (event) => {
  const newTime = Number(event.target.value);

  if (audioRef.current) {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
};

  return (
    <div className="app">
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
        }}
      />

      <Sidebar />

      <main className="main-content">
        <TopBar />

        <PlaylistSection
          selectedPlaylist={selectedPlaylist}
          onSelectPlaylist={setSelectedPlaylist}
          onSelectTrack={handleTrackSelect}
        />
      </main>

  <PlayerBar
  currentTrack={currentTrack}
  isPlaying={isPlaying}
  onPlayPause={handlePlayPause}
  onNextTrack={handleNextTrack}
  onPreviousTrack={handlePreviousTrack}
  currentTime={currentTime}
  duration={duration}
  onSeek={handleSeek}
/>
    </div>
  );
}

export default App;
