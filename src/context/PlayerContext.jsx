
import { createContext, useContext, useState } from 'react';

// Create Player Context
const PlayerContext = createContext();

// Provider component
export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook to access Player Context
// eslint-disable-next-line react-refresh/only-export-components
export function usePlayer() {
  return useContext(PlayerContext);
}