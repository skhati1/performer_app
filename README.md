# 🎵 Performer - Song Management App

A beautiful, mobile-friendly PWA for managing your song library with support for Hindi and English lyrics, chord progressions, and advanced filtering capabilities.

## ✨ Features

- 🔍 **Advanced Search** - Search by song name or artist
- 🏷️ **Tag-based Filtering** - Filter songs by custom tags (romantic, bollywood, western, etc.)
- 🌐 **Bilingual Support** - Toggle between Hindi and English lyrics
- 🎼 **Chord Display** - View chord progressions for each song
- 📱 **Mobile-First Design** - Optimized for mobile devices
- 🌙 **Native Dark Theme** - Beautiful dark UI
- ⚡ **PWA Support** - Install as a native app
- 🎨 **Smooth Animations** - Engaging micro-interactions
- 📤 **Share Songs** - Native sharing capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Main home page
│   ├── SongDetail.jsx        # Individual song view
│   ├── SearchBox.jsx         # Search functionality
│   ├── FilterBar.jsx         # Tag filtering
│   ├── SongCard.jsx          # Song preview cards
│   └── *.css                 # Component styles
├── utils/
│   └── songLoader.js         # Song data loading
├── App.jsx                   # Main app component
├── main.jsx                  # React entry point
└── index.css                 # Global styles

public/
├── songs/                    # JSON song files folder
│   └── sample-song.json      # Sample song structure
└── manifest.json             # PWA manifest
```

## 🎵 Adding Songs

### Song JSON Structure

Create JSON files in the `public/songs/` folder:

```json
{
  "id": "unique-song-id",
  "songName": "Song Title",
  "artist": "Artist Name", 
  "language": "Hindi",
  "key": "C",
  "chords": ["C", "G", "Am", "F"],
  "customTags": ["romantic", "bollywood", "slow"],
  "lyrics": {
    "hindi": "Hindi lyrics...",
    "english": "English translation..."
  }
}
```

### Supported Tags

- **Genre**: `bollywood`, `western`, `classical`, `folk`
- **Mood**: `romantic`, `sad`, `happy`, `energetic`
- **Tempo**: `slow`, `medium`, `fast`
- **Occasion**: `wedding`, `party`, `devotional`
- **Type**: `duet`, `solo`, `group`

## 🎨 Customization

### Colors & Themes

Edit CSS custom properties in `src/index.css`:

```css
:root {
  --primary: #2563eb;        /* Main brand color */
  --accent: #10b981;         /* Secondary accent */
  --background: #000000;     /* App background */
  --card: #2a2a2a;          /* Card backgrounds */
  --text-primary: #ffffff;   /* Primary text */
  /* ... more variables */
}
```

### Typography

The app uses system fonts with fallbacks. To use custom fonts:

1. Add font files to `public/fonts/`
2. Update CSS font-family declarations
3. Add font loading to `index.html`

## 📱 PWA Features

- **Offline Support** - Works without internet
- **Install Prompt** - Add to home screen
- **Background Sync** - Sync when online
- **Push Notifications** - Song recommendations
- **App Shortcuts** - Quick actions from home screen

## 🔧 Advanced Usage

### Real Song Loading

To load songs from actual JSON files, modify `src/utils/songLoader.js`:

```javascript
export const loadSongs = async () => {
  try {
    // Fetch song file list from your server
    const response = await fetch('/api/songs');
    const songFiles = await response.json();
    
    // Load each song file
    const songs = await Promise.all(
      songFiles.map(async (file) => {
        const songResponse = await fetch(`/songs/${file}`);
        return await songResponse.json();
      })
    );
    
    return songs;
  } catch (error) {
    console.error('Failed to load songs:', error);
    return [];
  }
};
```

### Adding New Components

1. Create component file in `src/components/`
2. Add corresponding CSS file
3. Import and use in parent components
4. Follow existing naming conventions

## 🛠️ Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Custom Properties** - Theming
- **PWA Plugin** - Progressive Web App features
- **ES6+ JavaScript** - Modern JavaScript

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Icons from system emoji
- Design inspiration from modern music apps
- Community feedback and contributions

---

**Happy Performing! 🎤**