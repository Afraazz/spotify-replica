
import './App.css';
import { useRef, useState } from 'react';
import { playlists } from './data';
import TrackList from './TrackList';
import { usePlayer } from './context/PlayerContext.jsx';

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

function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">♫ Spotify</h2>

      <nav className="main-nav">
        <a
          href="#"
          className={activeView === 'home' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault();
            onViewChange('home');
          }}
        >
          <Home size={22} />
          <span>Home</span>
        </a>

        <a
          href="#"
          className={activeView === 'search' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault();
            onViewChange('search');
          }}
        >
          <Search size={22} />
          <span>Search</span>
        </a>

        <a
          href="#"
          className={activeView === 'library' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault();
            onViewChange('library');
          }}
        >
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
  onSelectTrack,
  activeView,
  onViewChange
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const allTracks = playlists.flatMap((playlist) => playlist.tracks);

  const filteredTracks = allTracks.filter((track) =>
    `${track.title} ${track.artist}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="playlist-section">

      {activeView === 'home' && (
        <>
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
        </>
      )}

      {activeView === 'search' && (
        <div className="track-section">
          <h1>Search</h1>

          <input
            type="search"
            placeholder="Search all tracks or artists..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="track-search"
          />

          {searchTerm.trim() && (
            <>
              <h2>Search Results</h2>

              {filteredTracks.length > 0 ? (
                <TrackList
                  tracks={filteredTracks}
                  onTrackSelect={onSelectTrack}
                />
              ) : (
                <p>No matching tracks found.</p>
              )}
            </>
          )}
        </div>
      )}

      {activeView === 'library' && (
        <div className="track-section">
          <h1>Your Library</h1>
          <p>Your playlists</p>

          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <div
                className="playlist-card"
                key={playlist.id}
                onClick={() => {
                  onSelectPlaylist(playlist);
                  onViewChange('home');
                }}
                style={{ cursor: 'pointer' }}
              >
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}



// Music player
function PlayerBar({
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  currentTime,
  duration,
  onSeek
}) {
  const { currentTrack, isPlaying } = usePlayer();
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
const [activeView, setActiveView] = useState('home');
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const {
  currentTrack,
  setCurrentTrack,
  setIsPlaying
} = usePlayer();

  // Select and play a track
  const handleTrackSelect = (track) => {
  const matchingPlaylist = playlists.find((playlist) =>
    playlist.tracks.some((item) => item.id === track.id)
  );

  if (matchingPlaylist) {
    setSelectedPlaylist(matchingPlaylist);
  }

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

      <Sidebar
  activeView={activeView}
  onViewChange={setActiveView}
/>

      <main className="main-content">
        <TopBar />

<PlaylistSection
  selectedPlaylist={selectedPlaylist}
  onSelectPlaylist={setSelectedPlaylist}
  onSelectTrack={handleTrackSelect}
  activeView={activeView}
  onViewChange={setActiveView}
/>
      </main>

<PlayerBar
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
