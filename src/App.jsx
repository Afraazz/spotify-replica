
import './App.css';

import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  SkipBack,
  Play,
  SkipForward,
  Volume2
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
        <button className="upgrade-btn">
          Explore Premium
        </button>

        <button className="profile-btn">
          A
        </button>
      </div>
    </header>
  );
}

// Playlist data
const playlists = [
  {
    id: 1,
    title: 'Daily Mix',
    description: 'Your favourite music, mixed daily.',
    color: '#5b3c88'
  },
  {
    id: 2,
    title: 'Chill Vibes',
    description: 'Relax and enjoy your day.',
    color: '#315b55'
  },
  {
    id: 3,
    title: 'Top Hits',
    description: 'Popular tracks you might enjoy.',
    color: '#934b35'
  },
  {
    id: 4,
    title: 'Focus Music',
    description: 'Music to help you concentrate.',
    color: '#345b83'
  }
];

// Playlist section
function PlaylistSection() {
  return (
    <section className="playlist-section">
      <h1>Good afternoon</h1>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            style={{
              backgroundColor: playlist.color
            }}
          >
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlayerBar() {
  return (
    <footer className="player-bar">
      <div className="track-info">
        <div className="track-cover">♫</div>

        <div>
          <h4>Sample Track</h4>
          <p>Unknown Artist</p>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button><SkipBack size={20} /></button>

          <button className="play-button">
            <Play size={20} fill="black" />
          </button>

          <button><SkipForward size={20} /></button>
        </div>

        <div className="progress-container">
          <span>0:00</span>
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
          <span>3:30</span>
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
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <TopBar />
        <PlaylistSection />
      </main>

      <PlayerBar />
    </div>
  );
}

export default App;