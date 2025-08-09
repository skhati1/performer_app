import React, { createContext, useContext, useEffect, useState } from "react";

const SongCompletionContext = createContext();

export function useSongCompletion() {
  return useContext(SongCompletionContext);
}

export function SongCompletionProvider({ children }) {
  const [completedSongs, setCompletedSongs] = useState({});

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("completedSongs");
    if (stored) setCompletedSongs(JSON.parse(stored));
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("completedSongs", JSON.stringify(completedSongs));
  }, [completedSongs]);

  const toggleSong = (songId) => {
    setCompletedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  const resetCompletedSongs = () => {
    sessionStorage.removeItem("completedSongs");
    setCompletedSongs({});
  };

  return (
    <SongCompletionContext.Provider value={{ completedSongs, toggleSong, resetCompletedSongs }}>
      {children}
    </SongCompletionContext.Provider>
  );
}