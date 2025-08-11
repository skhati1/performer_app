import { createContext, useContext, useEffect, useState } from "react";

const SongCompletionContext = createContext();

export function useSongCompletion() {
  return useContext(SongCompletionContext);
}

export function SongCompletionProvider({ children }) {
  const [completedSongs, setCompletedSongs] = useState({});

  // Load from localStorage on startup
  useEffect(() => {
    const stored = localStorage.getItem("completedSongs");
    if (stored) setCompletedSongs(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever completedSongs changes
  useEffect(() => {
    localStorage.setItem("completedSongs", JSON.stringify(completedSongs));
  }, [completedSongs]);

  const toggleSong = (songId) => {
    setCompletedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  const resetCompletedSongs = () => {
    localStorage.removeItem("completedSongs");
    setCompletedSongs({});
  };

  return (
    <SongCompletionContext.Provider value={{ completedSongs, toggleSong, resetCompletedSongs }}>
      {children}
    </SongCompletionContext.Provider>
  );
}