export const loadSongs = async () => {
  try {
    try {
      const indexResponse = await fetch('/songs/index.json');
      if (indexResponse.ok) {
        const songFiles = await indexResponse.json();
        const songs = await Promise.all(
          songFiles.map(async (filename) => {
            try {
              const response = await fetch(`/songs/${filename}`);
              if (response.ok) {
                return await response.json();
              }
              console.warn(`Failed to load song file: ${filename}`);
              return null;
            } catch (error) {
              console.warn(`Error loading ${filename}:`, error);
              return null;
            }
          })
        );
        return songs.filter(song => song !== null);
      }
    } catch (error) {
      console.log('No index.json found, trying individual files...');
    }
  } catch (error) {
    console.error('Error loading songs:', error);
    return getSampleSongs();
  }
};

export const getSongById = (songs, id) => {
  return songs.find(song => song.id === id);
};