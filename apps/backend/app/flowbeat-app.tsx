'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FormEvent, useEffect, useRef, useState } from 'react';

// ── Icons ──────────────────────────────────────────────────────────
const Icons = {
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  prev: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  heartFilled: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" width="16" height="16">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  library: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  ),
  volume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  playlist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
};

// ── Types ──────────────────────────────────────────────────────────
interface Artist {
  id: string;
  name: string;
  artworkUrl?: string;
}

interface Album {
  id: string;
  title: string;
  artists: Artist[];
  artworkUrl?: string;
  year?: number;
}

interface Track {
  id: string;
  title: string;
  artists: Artist[];
  album?: Album;
  durationMs?: number;
  artworkUrl?: string;
}

interface Playlist {
  id: string;
  title: string;
  description?: string;
  tracks: Track[];
  gradient: string;
}

// ── Mock Design System Data ───────────────────────────────────────
const mockAlbums = [
  { id: '1', title: 'Neon Horizons', artist: 'Synthwave Collective', art: '/assets/album_synthwave.png', year: 2024, genre: 'Electronic' },
  { id: '2', title: 'Midnight Stories', artist: 'J. Cole', art: '/assets/album_hiphop.png', year: 2024, genre: 'Hip-Hop' },
  { id: '3', title: 'Prismatic', artist: 'Aurora Belle', art: '/assets/album_pop.png', year: 2025, genre: 'Pop' },
  { id: '4', title: 'Celestial Drift', artist: 'Cosmos', art: '/assets/album_electronic.png', year: 2025, genre: 'Ambient' },
  { id: '5', title: 'Golden Hour', artist: 'Sade Velvet', art: '/assets/album_rnb.png', year: 2024, genre: 'R&B' },
  { id: '6', title: 'Desert Highways', artist: 'The Wanderers', art: '/assets/album_rock.png', year: 2025, genre: 'Rock' },
];

const mockArtists = [
  { id: '1', name: 'Synthwave Collective', art: '/assets/album_synthwave.png', followers: '2.4M' },
  { id: '2', name: 'J. Cole', art: '/assets/album_hiphop.png', followers: '18.7M' },
  { id: '3', name: 'Aurora Belle', art: '/assets/album_pop.png', followers: '5.1M' },
  { id: '4', name: 'Cosmos', art: '/assets/album_electronic.png', followers: '1.8M' },
  { id: '5', name: 'Sade Velvet', art: '/assets/album_rnb.png', followers: '3.2M' },
  { id: '6', name: 'The Wanderers', art: '/assets/album_rock.png', followers: '4.5M' },
];

const mockSongs: Track[] = [
  { id: 'Neon Dreams', title: 'Neon Dreams', artists: [{ id: '1', name: 'Synthwave Collective' }], album: { id: '1', title: 'Neon Horizons', artists: [{ id: '1', name: 'Synthwave Collective' }], artworkUrl: '/assets/album_synthwave.png' }, durationMs: 225000, artworkUrl: '/assets/album_synthwave.png' },
  { id: 'Retrograde Synthwave', title: 'Retrograde', artists: [{ id: '1', name: 'Synthwave Collective' }], album: { id: '1', title: 'Neon Horizons', artists: [{ id: '1', name: 'Synthwave Collective' }], artworkUrl: '/assets/album_synthwave.png' }, durationMs: 198000, artworkUrl: '/assets/album_synthwave.png' },
  { id: 'Chrome Sunset', title: 'Chrome Sunset', artists: [{ id: '1', name: 'Synthwave Collective' }], album: { id: '1', title: 'Neon Horizons', artists: [{ id: '1', name: 'Synthwave Collective' }], artworkUrl: '/assets/album_synthwave.png' }, durationMs: 243000, artworkUrl: '/assets/album_synthwave.png' },
  { id: 'J. Cole Midnight Run', title: 'Midnight Run', artists: [{ id: '2', name: 'J. Cole' }], album: { id: '2', title: 'Midnight Stories', artists: [{ id: '2', name: 'J. Cole' }], artworkUrl: '/assets/album_hiphop.png' }, durationMs: 217000, artworkUrl: '/assets/album_hiphop.png' },
  { id: 'J. Cole City Lights', title: 'City Lights', artists: [{ id: '2', name: 'J. Cole' }], album: { id: '2', title: 'Midnight Stories', artists: [{ id: '2', name: 'J. Cole' }], artworkUrl: '/assets/album_hiphop.png' }, durationMs: 189000, artworkUrl: '/assets/album_hiphop.png' },
  { id: 'Aurora Belle Kaleidoscope', title: 'Kaleidoscope', artists: [{ id: '3', name: 'Aurora Belle' }], album: { id: '3', title: 'Prismatic', artists: [{ id: '3', name: 'Aurora Belle' }], artworkUrl: '/assets/album_pop.png' }, durationMs: 201000, artworkUrl: '/assets/album_pop.png' },
  { id: 'Sade Velvet Velvet Touch', title: 'Velvet Touch', artists: [{ id: '5', name: 'Sade Velvet' }], album: { id: '5', title: 'Golden Hour', artists: [{ id: '5', name: 'Sade Velvet' }], artworkUrl: '/assets/album_rnb.png' }, durationMs: 234000, artworkUrl: '/assets/album_rnb.png' },
  { id: 'The Wanderers Open Road', title: 'Open Road', artists: [{ id: '6', name: 'The Wanderers' }], album: { id: '6', title: 'Desert Highways', artists: [{ id: '6', name: 'The Wanderers' }], artworkUrl: '/assets/album_rock.png' }, durationMs: 267000, artworkUrl: '/assets/album_rock.png' },
];

const mockPlaylists: Playlist[] = [
  { id: '1', title: 'Late Night Vibes', description: 'Smooth tracks for midnight sessions', gradient: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', tracks: [mockSongs[0], mockSongs[4], mockSongs[6]] },
  { id: '2', title: 'Energy Boost', description: 'High-energy bangers to fuel your day', gradient: 'linear-gradient(135deg, #7c2d12, #dc2626)', tracks: [mockSongs[5], mockSongs[3], mockSongs[7]] },
  { id: '3', title: 'Chill Electronica', description: 'Ambient beats and dreamy soundscapes', gradient: 'linear-gradient(135deg, #164e63, #0891b2)', tracks: [mockSongs[2], mockSongs[0], mockSongs[6]] },
];

const genres = [
  { name: 'Pop', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', emoji: '🎤' },
  { name: 'Hip-Hop', gradient: 'linear-gradient(135deg, #f97316, #ef4444)', emoji: '🎧' },
  { name: 'Rock', gradient: 'linear-gradient(135deg, #64748b, #334155)', emoji: '🎸' },
  { name: 'Electronic', gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', emoji: '🎹' },
  { name: 'R&B', gradient: 'linear-gradient(135deg, #d97706, #b45309)', emoji: '🎷' },
  { name: 'Jazz', gradient: 'linear-gradient(135deg, #059669, #0d9488)', emoji: '🎺' },
];

export default function FlowbeatApp() {
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'library'>('home');
  const [currentTrack, setCurrentTrack] = useState<Track>(mockSongs[0]);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const savedLikes = localStorage.getItem('flowbeat_likes');
      if (savedLikes) {
        try {
          return new Set(JSON.parse(savedLikes));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return new Set();
  });
  const [queue, setQueue] = useState<Track[]>([mockSongs[0]]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [libraryView, setLibraryView] = useState<'list' | 'grid'>('list');
  const [libraryFilter, setLibraryFilter] = useState<'playlists' | 'liked'>('playlists');
  
  // Custom user playlists
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(() => {
    if (typeof window !== 'undefined') {
      const savedPlaylists = localStorage.getItem('flowbeat_playlists');
      if (savedPlaylists) {
        try {
          return JSON.parse(savedPlaylists);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPlTitle, setNewPlTitle] = useState('');
  const [newPlDesc, setNewPlDesc] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string>();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Register PWA Service Worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
        .catch((err) => console.error('PWA SW registration failed:', err));
    }
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setIsLoadingStream(false);
    setError('Failed to play stream. Try loading another track.');
  };

  // Play a track (resolves real stream from YT via backend)
  const playTrack = async (track: Track, newQueue?: Track[]) => {
    setError(undefined);
    setIsPlaying(false);
    setStreamUrl(null);
    setCurrentTrack(track);
    setIsLoadingStream(true);

    if (newQueue) {
      setQueue(newQueue);
      const idx = newQueue.findIndex(t => t.id === track.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    } else {
      // Add to queue if not present
      if (!queue.some(t => t.id === track.id)) {
        const updated = [...queue];
        updated.splice(queueIndex + 1, 0, track);
        setQueue(updated);
        setQueueIndex(queueIndex + 1);
      } else {
        const idx = queue.findIndex(t => t.id === track.id);
        setQueueIndex(idx >= 0 ? idx : 0);
      }
    }

    try {
      let resolvedId = track.id;

      // For mock songs, we dynamically search and resolve a real YouTube ID first
      if (track.id.includes(' ') || track.id.length < 5) {
        const searchParams = new URLSearchParams({
          q: `${track.title} ${track.artists[0]?.name}`,
          kind: 'tracks',
          limit: '1',
        });
        const res = await fetch(`/api/yt/search?${searchParams}`);
        const data = await res.json();
        if (data.tracks && data.tracks.length > 0) {
          resolvedId = data.tracks[0].id;
        } else {
          throw new Error('Track not found on YouTube');
        }
      }

      // Fetch the signed stream url
      const resTrack = await fetch(`/api/yt/track/${encodeURIComponent(resolvedId)}`);
      if (!resTrack.ok) throw new Error('Failed to fetch stream details.');
      
      const payload = await resTrack.json();
      const streams = payload.streams ?? [];
      if (streams.length === 0) throw new Error('No audio streams available.');

      // Pick the highest quality stream (already sorted backend)
      const bestStream = streams[0];
      setStreamUrl(bestStream.url);
      setIsPlaying(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Failed to stream track.');
    } finally {
      setIsLoadingStream(false);
    }
  };

  const togglePlayPause = () => {
    if (!streamUrl && !isLoadingStream) {
      playTrack(currentTrack);
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(handleAudioError);
      }
    }
  };

  const handlePrev = () => {
    if (progress > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setProgress(0);
      }
      return;
    }
    const prevIdx = (queueIndex - 1 + queue.length) % queue.length;
    playTrack(queue[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (queueIndex + 1) % queue.length;
    playTrack(queue[nextIdx]);
  };

  const toggleLike = (trackId: string) => {
    const updated = new Set(likedTracks);
    if (updated.has(trackId)) {
      updated.delete(trackId);
    } else {
      updated.add(trackId);
    }
    setLikedTracks(updated);
    localStorage.setItem('flowbeat_likes', JSON.stringify(Array.from(updated)));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const seekTime = pct * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  // Search logic (debounced hitting real backend API)
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const searchParams = new URLSearchParams({
          q: query,
          kind: 'tracks',
          limit: '15',
        });
        const res = await fetch(`/api/yt/search?${searchParams}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setSearchResults(data.tracks ?? []);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  // Custom user playlist creator
  const createPlaylist = (e: FormEvent) => {
    e.preventDefault();
    if (!newPlTitle.trim()) return;

    // Generate random premium gradient for card UI
    const randomGradients = [
      'linear-gradient(135deg, #1e1b4b, #4c1d95)',
      'linear-gradient(135deg, #7c2d12, #dc2626)',
      'linear-gradient(135deg, #164e63, #0891b2)',
      'linear-gradient(135deg, #78350f, #d97706)',
      'linear-gradient(135deg, #14532d, #16a34a)',
    ];
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      title: newPlTitle,
      description: newPlDesc || 'User created playlist',
      tracks: [],
      gradient: randomGradients[Math.floor(Math.random() * randomGradients.length)],
    };

    const updated = [...customPlaylists, newPlaylist];
    setCustomPlaylists(updated);
    localStorage.setItem('flowbeat_playlists', JSON.stringify(updated));

    setNewPlTitle('');
    setNewPlDesc('');
    setShowCreateDialog(false);
  };

  const addTrackToPlaylist = (track: Track, playlistId: string) => {
    const updated = customPlaylists.map(pl => {
      if (pl.id === playlistId) {
        // Prevent duplicate tracks
        if (pl.tracks.some(t => t.id === track.id)) return pl;
        return { ...pl, tracks: [...pl.tracks, track] };
      }
      return pl;
    });
    setCustomPlaylists(updated);
    localStorage.setItem('flowbeat_playlists', JSON.stringify(updated));
  };

  const getLikedTracksList = (): Track[] => {
    // Return all tracks in our current state/songs that are liked
    const list = [...mockSongs, ...searchResults].filter(t => likedTracks.has(t.id));
    return list;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      {/* Hidden Audio Player */}
      {streamUrl && (
        <audio
          ref={audioRef}
          src={streamUrl}
          autoPlay={isPlaying}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
          onError={handleAudioError}
        />
      )}

      {/* ═══ Sidebar Panel ═══ */}
      <aside className="sidebar">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <span className="sidebar__logo-text">Flowbeat</span>
        </div>

        <nav className="sidebar__nav">
          <button
            className={`sidebar__nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            {Icons.home}
            <span className="sidebar__nav-label">Home</span>
          </button>
          <button
            className={`sidebar__nav-item ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => setCurrentPage('search')}
          >
            {Icons.search}
            <span className="sidebar__nav-label">Search</span>
          </button>
          <button
            className={`sidebar__nav-item ${currentPage === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentPage('library')}
          >
            {Icons.library}
            <span className="sidebar__nav-label">Library</span>
          </button>
        </nav>

        <div className="sidebar__divider"></div>
        <div className="sidebar__section-title">Your Playlists</div>

        <div className="sidebar__playlists">
          {/* Static lists */}
          {mockPlaylists.map(pl => (
            <button
              key={pl.id}
              className="sidebar__playlist-item"
              onClick={() => {
                setCurrentPage('library');
                setLibraryFilter('playlists');
              }}
            >
              {Icons.playlist}
              <span>{pl.title}</span>
            </button>
          ))}
          {/* Custom playlists */}
          {customPlaylists.map(pl => (
            <button
              key={pl.id}
              className="sidebar__playlist-item"
              onClick={() => {
                setCurrentPage('library');
                setLibraryFilter('playlists');
              }}
            >
              {Icons.playlist}
              <span>{pl.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ═══ Main Dynamic Content Area ═══ */}
      <main className="main" id="main">
        <div className="main__content">
          
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px 20px', borderRadius: '8px', marginBottom: '24px', color: '#f87171', display: 'flex', justifyContent: 'between' }}>
              <span>⚠️ {error}</span>
              <button onClick={() => setError(undefined)} style={{ marginLeft: 'auto', fontWeight: 'bold' }}>✕</button>
            </div>
          )}

          {/* ── Home Page ── */}
          {currentPage === 'home' && (
            <>
              {/* Cover Art Hero */}
              <section className="hero">
                <div className="hero__bg">
                  <img src={mockAlbums[2].art} alt="" />
                </div>
                <div className="hero__overlay"></div>
                <div className="hero__content">
                  <img className="hero__art" src={mockAlbums[2].art} alt={mockAlbums[2].title} />
                  <div className="hero__info">
                    <span className="hero__label">Featured Album</span>
                    <h1 className="hero__title">{mockAlbums[2].title}</h1>
                    <p className="hero__meta">{mockAlbums[2].artist} · {mockAlbums[2].year} · {mockAlbums[2].genre}</p>
                    <div className="hero__actions">
                      <button className="btn btn--primary" onClick={() => playTrack(mockSongs[5], mockSongs)}>
                        {Icons.play} Play
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Picks */}
              <section className="section">
                <div className="section__header">
                  <h2 className="section__title">Quick Picks</h2>
                </div>
                <div className="quick-grid">
                  {mockSongs.map((song, i) => (
                    <div key={song.id} className="quick-card animate-in" onClick={() => playTrack(song, mockSongs)}>
                      <img className="quick-card__art" src={song.artworkUrl} alt={song.title} />
                      <span className="quick-card__title">{song.title}</span>
                      <div className="quick-card__play">{Icons.play}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Now */}
              <section className="section">
                <div className="section__header">
                  <h2 className="section__title">Trending Now</h2>
                </div>
                <div className="carousel-wrapper">
                  <div className="carousel">
                    {mockAlbums.map((album, i) => (
                      <div key={album.id} className="card" onClick={() => {
                        const s = mockSongs.find(song => song.album?.id === album.id);
                        if (s) playTrack(s, mockSongs);
                      }}>
                        <div className="card__art-wrapper">
                          <img className="card__art" src={album.art} alt={album.title} />
                          <div className="card__play-overlay">{Icons.play}</div>
                        </div>
                        <div className="card__title">{album.title}</div>
                        <div className="card__subtitle">{album.artist}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Top Artists */}
              <section className="section">
                <div className="section__header">
                  <h2 className="section__title">Top Artists</h2>
                </div>
                <div className="carousel-wrapper">
                  <div className="carousel">
                    {mockArtists.map((artist, i) => (
                      <div key={artist.id} className="card card--round">
                        <div className="card__art-wrapper">
                          <img className="card__art" src={artist.art} alt={artist.name} />
                          <div className="card__play-overlay">{Icons.play}</div>
                        </div>
                        <div className="card__title">{artist.name}</div>
                        <div className="card__subtitle">Artist</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── Search Page ── */}
          {currentPage === 'search' && (
            <>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>Search</h1>
              
              <div className="search-container">
                <div className="search-bar">
                  {Icons.search}
                  <input
                    type="text"
                    placeholder="Search songs, artists, or albums..."
                    value={searchQuery}
                    onChange={handleSearchInput}
                    autoComplete="off"
                  />
                  {isSearching && <span className="loader-glow">Searching...</span>}
                </div>
              </div>

              {searchResults.length > 0 ? (
                <section className="section">
                  <div className="section__header">
                    <h2 className="section__title">Search Results</h2>
                  </div>
                  <div className="library-list">
                    {searchResults.map((song) => {
                      const isLiked = likedTracks.has(song.id);
                      const isPlayingCurrent = currentTrack.id === song.id;
                      return (
                        <div key={song.id} className="library-item animate-in">
                          <img className="library-item__art" src={song.artworkUrl || '/icon.svg'} alt={song.title} onClick={() => playTrack(song, searchResults)} />
                          <div className="library-item__info" onClick={() => playTrack(song, searchResults)}>
                            <span className="library-item__title" style={isPlayingCurrent ? { color: 'var(--accent-pink)' } : {}}>
                              {song.title}
                            </span>
                            <span className="library-item__subtitle">
                              {song.artists.map(a => a.name).join(', ')} {song.durationMs ? `· ${formatTime(song.durationMs / 1000)}` : ''}
                            </span>
                          </div>
                          
                          {/* Custom Playlist Adder */}
                          {customPlaylists.length > 0 && (
                            <select 
                              onChange={(e) => {
                                if (e.target.value) {
                                  addTrackToPlaylist(song, e.target.value);
                                  e.target.value = '';
                                  alert(`Added to playlist!`);
                                }
                              }}
                              style={{ background: '#111', color: '#a1a1aa', border: '1px solid #333', borderRadius: '4px', fontSize: '0.75rem', padding: '4px' }}
                            >
                              <option value="">+ Add to Playlist</option>
                              {customPlaylists.map(pl => (
                                <option key={pl.id} value={pl.id}>{pl.title}</option>
                              ))}
                            </select>
                          )}

                          <button
                            className="library-item__action"
                            style={{ opacity: 1, color: isLiked ? 'var(--accent-pink)' : 'var(--text-muted)' }}
                            onClick={() => toggleLike(song.id)}
                          >
                            {isLiked ? Icons.heartFilled : Icons.heart}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                <section className="section">
                  <div className="section__header">
                    <h2 className="section__title">Browse All</h2>
                  </div>
                  <div className="genre-grid">
                    {genres.map((g, i) => (
                      <div key={i} className="genre-card animate-in" style={{ background: g.gradient }} onClick={() => {
                        setSearchQuery(g.name);
                        handleSearchInput({ target: { value: g.name } } as any);
                      }}>
                        <span className="genre-card__title">{g.name}</span>
                        <span className="genre-card__emoji">{g.emoji}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ── Library Page ── */}
          {currentPage === 'library' && (
            <>
              <div className="library-header">
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800 }}>Your Library</h1>
                <div className="library-header__actions">
                  <button className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => setShowCreateDialog(true)}>
                    + Create Playlist
                  </button>
                  <button className={`library-view-btn ${libraryView === 'list' ? 'active' : ''}`} onClick={() => setLibraryView('list')}>
                    {Icons.list}
                  </button>
                  <button className={`library-view-btn ${libraryView === 'grid' ? 'active' : ''}`} onClick={() => setLibraryView('grid')}>
                    {Icons.grid}
                  </button>
                </div>
              </div>

              <div className="chips">
                <button className={`chip ${libraryFilter === 'playlists' ? 'active' : ''}`} onClick={() => setLibraryFilter('playlists')}>
                  Playlists
                </button>
                <button className={`chip ${libraryFilter === 'liked' ? 'active' : ''}`} onClick={() => setLibraryFilter('liked')}>
                  Liked Songs
                </button>
              </div>

              {libraryFilter === 'playlists' ? (
                <div className="playlist-grid">
                  {/* Mock Playlists */}
                  {mockPlaylists.map((pl) => (
                    <div key={pl.id} className="playlist-card animate-in" onClick={() => {
                      if (pl.tracks.length > 0) playTrack(pl.tracks[0], pl.tracks);
                    }}>
                      <div className="playlist-card__bg" style={{ background: pl.gradient }}></div>
                      <div className="playlist-card__overlay"></div>
                      <div className="playlist-card__info">
                        <h3 className="playlist-card__title">{pl.title}</h3>
                        <p className="playlist-card__desc">{pl.tracks.length} songs</p>
                      </div>
                    </div>
                  ))}

                  {/* User custom Playlists */}
                  {customPlaylists.map((pl) => (
                    <div key={pl.id} className="playlist-card animate-in" onClick={() => {
                      if (pl.tracks.length > 0) {
                        playTrack(pl.tracks[0], pl.tracks);
                      } else {
                        alert('This playlist is empty! Search and add songs from the Search tab.');
                      }
                    }}>
                      <div className="playlist-card__bg" style={{ background: pl.gradient }}></div>
                      <div className="playlist-card__overlay"></div>
                      <div className="playlist-card__info">
                        <h3 className="playlist-card__title">{pl.title}</h3>
                        <p className="playlist-card__desc">{pl.tracks.length} songs</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="library-list">
                  {getLikedTracksList().length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-secondary)' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💜</div>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Songs you like will appear here</p>
                      <p>Tap the heart icon next to any search results to save tracks</p>
                    </div>
                  ) : (
                    getLikedTracksList().map((song) => {
                      const isPlayingCurrent = currentTrack.id === song.id;
                      return (
                        <div key={song.id} className="library-item animate-in" onClick={() => playTrack(song, getLikedTracksList())}>
                          <img className="library-item__art" src={song.artworkUrl || '/icon.svg'} alt={song.title} />
                          <div className="library-item__info">
                            <span className="library-item__title" style={isPlayingCurrent ? { color: 'var(--accent-pink)' } : {}}>
                              {song.title}
                            </span>
                            <span className="library-item__subtitle">
                              {song.artists.map(a => a.name).join(', ')}
                            </span>
                          </div>
                          <button
                            className="library-item__action"
                            style={{ opacity: 1, color: 'var(--accent-pink)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(song.id);
                            }}
                          >
                            {Icons.heartFilled}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* ═══ Create Custom Playlist Dialog ═══ */}
      {showCreateDialog && (
        <div className="dialog-overlay" onClick={() => setShowCreateDialog(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h2>Create Playlist</h2>
            <form onSubmit={createPlaylist}>
              <label style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Playlist Name</label>
              <input
                type="text"
                value={newPlTitle}
                onChange={(e) => setNewPlTitle(e.target.value)}
                placeholder="My playlist #1"
                required
                autoFocus
              />
              <label style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Description (optional)</label>
              <input
                type="text"
                value={newPlDesc}
                onChange={(e) => setNewPlDesc(e.target.value)}
                placeholder="Cool tracks..."
              />
              <div className="dialog-box__actions">
                <button type="button" className="btn btn--ghost" style={{ padding: '8px 16px' }} onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" style={{ padding: '8px 16px' }}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Now Playing Bar Panel ═══ */}
      <footer className="now-playing">
        {/* Left: playback controls */}
        <div className="now-playing__left-controls">
          <button className="now-playing__btn" onClick={handlePrev} aria-label="Previous">
            {Icons.prev}
          </button>
          <button className="now-playing__btn now-playing__btn--play" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? Icons.pause : Icons.play}
          </button>
          <button className="now-playing__btn" onClick={handleNext} aria-label="Next">
            {Icons.next}
          </button>
          <button
            className={`now-playing__like ${likedTracks.has(currentTrack.id) ? 'liked' : ''}`}
            onClick={() => toggleLike(currentTrack.id)}
            aria-label="Like"
          >
            {likedTracks.has(currentTrack.id) ? Icons.heartFilled : Icons.heart}
          </button>
        </div>

        {/* Center: song info & seek slider */}
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, width: '100%' }}>
          <div className="now-playing__song">
            <img className="now-playing__art" src={currentTrack.artworkUrl || '/icon.svg'} alt={currentTrack.title} />
            <div className="now-playing__info">
              <span className="now-playing__title truncate">{currentTrack.title}</span>
              <span className="now-playing__artist truncate">{currentTrack.artists.map(a => a.name).join(', ')}</span>
            </div>
            
            {/* Animative waveform */}
            <div className={`now-playing__waveform ${!isPlaying ? 'paused' : ''}`}>
              <div className="now-playing__waveform-bar"></div>
              <div className="now-playing__waveform-bar"></div>
              <div className="now-playing__waveform-bar"></div>
              <div className="now-playing__waveform-bar"></div>
              <div className="now-playing__waveform-bar"></div>
            </div>
          </div>

          <div className="now-playing__seek">
            <span>{formatTime(progress)}</span>
            <div className="now-playing__seek-track" onClick={handleSeek}>
              <div
                className="now-playing__progress-fill"
                style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span>
            {isLoadingStream && <span className="loader-glow">Resolving stream...</span>}
          </div>
        </div>

        {/* Right: volume controls */}
        <div className="now-playing__right-controls">
          <div className="now-playing__volume">
            <button className="now-playing__volume-btn" onClick={() => setVolume(volume === 0 ? 70 : 0)}>
              {Icons.volume}
            </button>
            <input
              type="range"
              className="now-playing__volume-slider"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
