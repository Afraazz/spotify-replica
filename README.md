# Spotify Replica – Music Streaming Web App

A Spotify-inspired music streaming web application built using React. This project was developed as part of my frontend development internship at Sapphire IQ.

The application allows users to browse playlists, search for songs and artists, and play audio using an interactive music player.

## Features

- **Spotify-inspired UI:** Dark-themed interface with sidebar navigation and a responsive layout.
- **Playlist Management:** Browse four playlists and view their tracks.
- **Track Listing:** Display songs dynamically using reusable React components.
- **Global Search:** Search for songs and artists across all playlists.
- **Audio Playback:** Play and pause audio tracks.
- **Player Controls:** Previous, next, and play/pause controls.
- **Progress Bar:** View playback progress and seek to different positions.
- **Now Playing Bar:** Persistent music player displayed across application views.
- **Navigation:** Switch between Home, Search, and Your Library without interrupting playback.
- **Shared State:** React Context API manages the currently playing track and playback status.

## Technologies Used

- React.js
- JavaScript
- Vite
- HTML5
- CSS3
- React Context API
- React Hooks (`useState`, `useRef`, `useContext`)
- Lucide React
- HTML5 Audio API

## Project Structure

```text
spotify-replica/
├── public/
│   └── audio/
│       ├── sample-1.mp3
│       ├── sample-2.mp3
│       └── ...
├── src/
│   ├── context/
│   │   └── PlayerContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── data.js
│   ├── TrackList.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Afraazz/spotify-replica.git
```

### 2. Navigate to the project folder

```bash
cd spotify-replica
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run lint` | Checks code using ESLint |
| `npm run preview` | Previews the production build |

## Audio Information

The application uses locally stored sample MP3 files in the `public/audio/` directory for playback.

These sample audio files are used for demonstration purposes. Some tracks may reuse the same sample audio.

## Learning Outcomes

Through this project, I gained practical experience with:

- Building reusable React components.
- Managing state using React Hooks.
- Passing data through component props.
- Implementing global state using Context API.
- Working with JavaScript array methods such as `map()` and `filter()`.
- Implementing audio playback using the HTML5 Audio API.
- Using `useRef` to access audio elements.
- Building search and navigation functionality.
- Creating responsive user interfaces with CSS.

## GitHub Repository

[https://github.com/Afraazz/spotify-replica](https://github.com/Afraazz/spotify-replica)

## Acknowledgement

This project was developed as part of my Frontend Development Internship at Sapphire IQ.

