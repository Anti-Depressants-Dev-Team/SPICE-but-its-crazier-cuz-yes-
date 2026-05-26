/* ================================================================
   FLOWBEAT — Music Streaming App
   Core application logic, routing, and rendering
   ================================================================ */

// ══════════════════════════════════════════════════════════════════
// SVG ICONS
// ══════════════════════════════════════════════════════════════════

const Icons = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  playlist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>',
  moreHorizontal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
};


// ══════════════════════════════════════════════════════════════════
// MOCK DATA
// ══════════════════════════════════════════════════════════════════

const albums = [
  { id: 1, title: 'Neon Horizons',     artist: 'Synthwave Collective', art: 'assets/album_synthwave.png', year: 2024, genre: 'Electronic' },
  { id: 2, title: 'Midnight Stories',   artist: 'J. Cole',             art: 'assets/album_hiphop.png',    year: 2024, genre: 'Hip-Hop' },
  { id: 3, title: 'Prismatic',          artist: 'Aurora Belle',        art: 'assets/album_pop.png',       year: 2025, genre: 'Pop' },
  { id: 4, title: 'Celestial Drift',    artist: 'Cosmos',              art: 'assets/album_electronic.png',year: 2025, genre: 'Ambient' },
  { id: 5, title: 'Golden Hour',        artist: 'Sade Velvet',         art: 'assets/album_rnb.png',       year: 2024, genre: 'R&B' },
  { id: 6, title: 'Desert Highways',    artist: 'The Wanderers',       art: 'assets/album_rock.png',      year: 2025, genre: 'Rock' },
];

const artists = [
  { id: 1, name: 'Synthwave Collective', art: 'assets/album_synthwave.png', followers: '2.4M' },
  { id: 2, name: 'J. Cole',              art: 'assets/album_hiphop.png',    followers: '18.7M' },
  { id: 3, name: 'Aurora Belle',          art: 'assets/album_pop.png',       followers: '5.1M' },
  { id: 4, name: 'Cosmos',                art: 'assets/album_electronic.png',followers: '1.8M' },
  { id: 5, name: 'Sade Velvet',           art: 'assets/album_rnb.png',      followers: '3.2M' },
  { id: 6, name: 'The Wanderers',         art: 'assets/album_rock.png',     followers: '4.5M' },
];

const songs = [
  { id: 1,  title: 'Neon Dreams',           artist: 'Synthwave Collective', album: albums[0], duration: 225 },
  { id: 2,  title: 'Retrograde',            artist: 'Synthwave Collective', album: albums[0], duration: 198 },
  { id: 3,  title: 'Chrome Sunset',         artist: 'Synthwave Collective', album: albums[0], duration: 243 },
  { id: 4,  title: 'Midnight Run',          artist: 'J. Cole',             album: albums[1], duration: 217 },
  { id: 5,  title: 'City Lights',           artist: 'J. Cole',             album: albums[1], duration: 189 },
  { id: 6,  title: 'Rain On Me',            artist: 'J. Cole',             album: albums[1], duration: 256 },
  { id: 7,  title: 'Kaleidoscope',          artist: 'Aurora Belle',        album: albums[2], duration: 201 },
  { id: 8,  title: 'Euphoria',              artist: 'Aurora Belle',        album: albums[2], duration: 178 },
  { id: 9,  title: 'Stardust',              artist: 'Cosmos',              album: albums[3], duration: 312 },
  { id: 10, title: 'Nebula Whispers',       artist: 'Cosmos',              album: albums[3], duration: 287 },
  { id: 11, title: 'Velvet Touch',          artist: 'Sade Velvet',         album: albums[4], duration: 234 },
  { id: 12, title: 'Amber Glow',            artist: 'Sade Velvet',         album: albums[4], duration: 209 },
  { id: 13, title: 'Open Road',             artist: 'The Wanderers',       album: albums[5], duration: 267 },
  { id: 14, title: 'Dusty Trails',          artist: 'The Wanderers',       album: albums[5], duration: 245 },
  { id: 15, title: 'Electric Pulse',        artist: 'Synthwave Collective', album: albums[0], duration: 210 },
  { id: 16, title: 'Broken Crown',          artist: 'The Wanderers',       album: albums[5], duration: 298 },
];

const playlists = [
  { id: 1, title: 'Late Night Vibes',     desc: 'Smooth tracks for midnight sessions',      gradient: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', songs: [songs[0], songs[4], songs[10], songs[9]] },
  { id: 2, title: 'Energy Boost',         desc: 'High-energy bangers to fuel your day',       gradient: 'linear-gradient(135deg, #7c2d12, #dc2626)', songs: [songs[6], songs[3], songs[14], songs[12]] },
  { id: 3, title: 'Chill Electronica',    desc: 'Ambient beats and dreamy soundscapes',       gradient: 'linear-gradient(135deg, #164e63, #0891b2)', songs: [songs[8], songs[9], songs[0], songs[2]] },
  { id: 4, title: 'Soulful Sundays',      desc: 'R&B and soul for a relaxed weekend',         gradient: 'linear-gradient(135deg, #78350f, #d97706)', songs: [songs[10], songs[11], songs[7], songs[5]] },
  { id: 5, title: 'Road Trip Anthems',    desc: 'Sing-along hits for the open highway',       gradient: 'linear-gradient(135deg, #14532d, #16a34a)', songs: [songs[12], songs[13], songs[15], songs[6]] },
  { id: 6, title: 'Focus Flow',           desc: 'Instrumental vibes for deep work',           gradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)', songs: [songs[8], songs[2], songs[9], songs[1]] },
];

const genres = [
  { name: 'Pop',         gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', emoji: '🎤' },
  { name: 'Hip-Hop',     gradient: 'linear-gradient(135deg, #f97316, #ef4444)', emoji: '🎧' },
  { name: 'Rock',        gradient: 'linear-gradient(135deg, #64748b, #334155)', emoji: '🎸' },
  { name: 'Electronic',  gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', emoji: '🎹' },
  { name: 'R&B',         gradient: 'linear-gradient(135deg, #d97706, #b45309)', emoji: '🎷' },
  { name: 'Jazz',        gradient: 'linear-gradient(135deg, #059669, #0d9488)', emoji: '🎺' },
  { name: 'Classical',   gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', emoji: '🎻' },
  { name: 'Indie',       gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)', emoji: '🌙' },
  { name: 'Lo-Fi',       gradient: 'linear-gradient(135deg, #a78bfa, #c084fc)', emoji: '☕' },
  { name: 'Latin',       gradient: 'linear-gradient(135deg, #e11d48, #f97316)', emoji: '💃' },
  { name: 'Country',     gradient: 'linear-gradient(135deg, #ca8a04, #a16207)', emoji: '🤠' },
  { name: 'Metal',       gradient: 'linear-gradient(135deg, #18181b, #52525b)', emoji: '🔥' },
];


// ══════════════════════════════════════════════════════════════════
// APPLICATION STATE
// ══════════════════════════════════════════════════════════════════

const state = {
  currentPage: 'home',
  currentSong: songs[0],
  isPlaying: false,
  progress: 0,
  volume: 70,
  shuffle: false,
  repeat: 'off', // off | all | one
  liked: new Set(),
  queue: [...songs],
  queueIndex: 0,
  libraryView: 'list',     // list | grid
  libraryFilter: 'playlists', // playlists | albums | artists | liked
  progressInterval: null,
};


// ══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ══════════════════════════════════════════════════════════════════

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createEl(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}


// ══════════════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════════════

function navigate(page) {
  state.currentPage = page;

  // Update nav active state
  document.querySelectorAll('.sidebar__nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Render page
  const content = document.getElementById('main-content');
  content.style.animation = 'none';
  content.offsetHeight; // trigger reflow
  content.style.animation = '';

  switch (page) {
    case 'home':    renderHome(content); break;
    case 'search':  renderSearch(content); break;
    case 'library': renderLibrary(content); break;
  }

  // Scroll to top
  document.getElementById('main').scrollTop = 0;
}


// ══════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════

function renderHome(container) {
  container.innerHTML = '';

  // ── Hero ──
  const featured = albums[2]; // Prismatic by Aurora Belle
  const hero = createEl('section', 'hero');
  hero.innerHTML = `
    <div class="hero__bg"><img src="${featured.art}" alt=""></div>
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <img class="hero__art" src="${featured.art}" alt="${featured.title}">
      <div class="hero__info">
        <span class="hero__label">Featured Album</span>
        <h1 class="hero__title">${featured.title}</h1>
        <p class="hero__meta">${featured.artist} · ${featured.year} · ${featured.genre}</p>
        <div class="hero__actions">
          <button class="btn btn--primary" id="hero-play" onclick="playSong(songs.find(s => s.album.id === ${featured.id}))">
            ${Icons.play} Play
          </button>
          <button class="btn btn--ghost">Save to Library</button>
        </div>
      </div>
    </div>
  `;
  container.appendChild(hero);

  // ── Quick Picks ──
  renderSection(container, 'Quick Picks', () => {
    const grid = createEl('div', 'quick-grid');
    const quickSongs = [songs[0], songs[4], songs[6], songs[10], songs[12], songs[8]];
    quickSongs.forEach((song, i) => {
      const card = createEl('div', 'quick-card animate-in');
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <img class="quick-card__art" src="${song.album.art}" alt="${song.title}">
        <span class="quick-card__title">${song.title}</span>
        <div class="quick-card__play">${Icons.play}</div>
      `;
      card.addEventListener('click', () => playSong(song));
      grid.appendChild(card);
    });
    return grid;
  });

  // ── Trending Now ──
  renderCarouselSection(container, 'Trending Now', albums, 'album');

  // ── Top Artists ──
  renderCarouselSection(container, 'Top Artists', artists, 'artist');

  // ── New Releases ──
  renderCarouselSection(container, 'New Releases', [...albums].reverse(), 'album');

  // ── Made For You ──
  renderSection(container, 'Made For You', () => {
    const grid = createEl('div', 'playlist-grid');
    playlists.forEach((pl, i) => {
      const card = createEl('div', 'playlist-card animate-in');
      card.style.animationDelay = `${i * 0.06}s`;
      card.innerHTML = `
        <div class="playlist-card__bg" style="background: ${pl.gradient}"></div>
        <div class="playlist-card__overlay"></div>
        <div class="playlist-card__info">
          <h3 class="playlist-card__title">${pl.title}</h3>
          <p class="playlist-card__desc">${pl.desc}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        if (pl.songs.length > 0) playSong(pl.songs[0]);
      });
      grid.appendChild(card);
    });
    return grid;
  });
}


// ══════════════════════════════════════════════════════════════════
// SEARCH PAGE
// ══════════════════════════════════════════════════════════════════

function renderSearch(container) {
  container.innerHTML = '';

  // ── Title ──
  const title = createEl('h1', '', 'Search');
  title.style.cssText = 'font-family: Outfit, sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 24px;';
  container.appendChild(title);

  // ── Search Bar ──
  const searchContainer = createEl('div', 'search-container');
  searchContainer.innerHTML = `
    <div class="search-bar">
      ${Icons.search}
      <input type="text" placeholder="What do you want to listen to?" id="search-input" autocomplete="off">
    </div>
  `;
  container.appendChild(searchContainer);

  // ── Search Results (hidden initially) ──
  const resultsContainer = createEl('div', 'section');
  resultsContainer.id = 'search-results';
  resultsContainer.style.display = 'none';
  container.appendChild(resultsContainer);

  // ── Browse Categories ──
  const browseSection = createEl('div', 'section');
  browseSection.id = 'browse-section';
  browseSection.innerHTML = `
    <div class="section__header">
      <h2 class="section__title">Browse All</h2>
    </div>
  `;

  const genreGrid = createEl('div', 'genre-grid');
  genres.forEach((genre, i) => {
    const card = createEl('div', 'genre-card animate-in');
    card.style.background = genre.gradient;
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <span class="genre-card__title">${genre.name}</span>
      <span class="genre-card__emoji">${genre.emoji}</span>
    `;
    genreGrid.appendChild(card);
  });
  browseSection.appendChild(genreGrid);
  container.appendChild(browseSection);

  // ── Search Logic ──
  const searchInput = container.querySelector('#search-input');
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length === 0) {
        resultsContainer.style.display = 'none';
        browseSection.style.display = '';
        return;
      }

      const matchedSongs = songs.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query)
      );
      const matchedAlbums = albums.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.artist.toLowerCase().includes(query)
      );
      const matchedArtists = artists.filter(a =>
        a.name.toLowerCase().includes(query)
      );

      browseSection.style.display = 'none';
      resultsContainer.style.display = '';
      resultsContainer.innerHTML = '';

      if (matchedSongs.length === 0 && matchedAlbums.length === 0 && matchedArtists.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 48px 0; color: var(--text-secondary);">
            <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">No results found</p>
            <p>Try searching for something else</p>
          </div>
        `;
        return;
      }

      // Songs results
      if (matchedSongs.length > 0) {
        const section = createEl('div', 'section');
        section.innerHTML = '<div class="section__header"><h2 class="section__title">Songs</h2></div>';
        const list = createEl('div', 'library-list');
        matchedSongs.forEach(song => {
          list.appendChild(createSongListItem(song));
        });
        section.appendChild(list);
        resultsContainer.appendChild(section);
      }

      // Albums results
      if (matchedAlbums.length > 0) {
        renderCarouselSection(resultsContainer, 'Albums', matchedAlbums, 'album');
      }

      // Artists results
      if (matchedArtists.length > 0) {
        renderCarouselSection(resultsContainer, 'Artists', matchedArtists, 'artist');
      }
    }, 250);
  });
}


// ══════════════════════════════════════════════════════════════════
// LIBRARY PAGE
// ══════════════════════════════════════════════════════════════════

function renderLibrary(container) {
  container.innerHTML = '';

  // ── Title + View Toggle ──
  const header = createEl('div', 'library-header');
  header.innerHTML = `
    <h1 style="font-family: Outfit, sans-serif; font-size: 2rem; font-weight: 800;">Your Library</h1>
    <div class="library-header__actions">
      <button class="library-view-btn ${state.libraryView === 'list' ? 'active' : ''}" id="lib-view-list" aria-label="List view">
        ${Icons.list}
      </button>
      <button class="library-view-btn ${state.libraryView === 'grid' ? 'active' : ''}" id="lib-view-grid" aria-label="Grid view">
        ${Icons.grid}
      </button>
    </div>
  `;
  container.appendChild(header);

  // ── Filter Chips ──
  const filters = ['playlists', 'albums', 'artists', 'liked'];
  const chips = createEl('div', 'chips');
  filters.forEach(f => {
    const chip = createEl('button', `chip ${state.libraryFilter === f ? 'active' : ''}`);
    chip.textContent = f.charAt(0).toUpperCase() + f.slice(1);
    chip.addEventListener('click', () => {
      state.libraryFilter = f;
      renderLibrary(container);
    });
    chips.appendChild(chip);
  });
  container.appendChild(chips);

  // ── Content ──
  const contentArea = createEl('div');
  contentArea.id = 'library-content';

  switch (state.libraryFilter) {
    case 'playlists':
      if (state.libraryView === 'list') {
        const list = createEl('div', 'library-list');
        playlists.forEach((pl, i) => {
          const item = createEl('div', 'library-item animate-in');
          item.style.animationDelay = `${i * 0.04}s`;
          item.innerHTML = `
            <div class="library-item__art" style="background: ${pl.gradient}; border-radius: var(--radius-sm);"></div>
            <div class="library-item__info">
              <span class="library-item__title">${pl.title}</span>
              <span class="library-item__subtitle">Playlist · ${pl.songs.length} songs</span>
            </div>
            <button class="library-item__action">${Icons.moreHorizontal}</button>
          `;
          item.addEventListener('click', () => { if (pl.songs.length > 0) playSong(pl.songs[0]); });
          list.appendChild(item);
        });
        contentArea.appendChild(list);
      } else {
        const grid = createEl('div', 'playlist-grid');
        playlists.forEach((pl, i) => {
          const card = createEl('div', 'playlist-card animate-in');
          card.style.animationDelay = `${i * 0.06}s`;
          card.innerHTML = `
            <div class="playlist-card__bg" style="background: ${pl.gradient}"></div>
            <div class="playlist-card__overlay"></div>
            <div class="playlist-card__info">
              <h3 class="playlist-card__title">${pl.title}</h3>
              <p class="playlist-card__desc">${pl.songs.length} songs</p>
            </div>
          `;
          card.addEventListener('click', () => { if (pl.songs.length > 0) playSong(pl.songs[0]); });
          grid.appendChild(card);
        });
        contentArea.appendChild(grid);
      }
      break;

    case 'albums':
      if (state.libraryView === 'list') {
        const list = createEl('div', 'library-list');
        albums.forEach((album, i) => {
          const item = createEl('div', 'library-item animate-in');
          item.style.animationDelay = `${i * 0.04}s`;
          item.innerHTML = `
            <img class="library-item__art" src="${album.art}" alt="${album.title}">
            <div class="library-item__info">
              <span class="library-item__title">${album.title}</span>
              <span class="library-item__subtitle">Album · ${album.artist}</span>
            </div>
            <button class="library-item__action">${Icons.moreHorizontal}</button>
          `;
          item.addEventListener('click', () => {
            const albumSongs = songs.filter(s => s.album.id === album.id);
            if (albumSongs.length > 0) playSong(albumSongs[0]);
          });
          list.appendChild(item);
        });
        contentArea.appendChild(list);
      } else {
        const grid = createEl('div', 'library-grid');
        albums.forEach((album, i) => {
          grid.appendChild(createAlbumCard(album, i));
        });
        contentArea.appendChild(grid);
      }
      break;

    case 'artists':
      if (state.libraryView === 'list') {
        const list = createEl('div', 'library-list');
        artists.forEach((artist, i) => {
          const item = createEl('div', 'library-item animate-in');
          item.style.animationDelay = `${i * 0.04}s`;
          item.innerHTML = `
            <img class="library-item__art library-item__art--round" src="${artist.art}" alt="${artist.name}">
            <div class="library-item__info">
              <span class="library-item__title">${artist.name}</span>
              <span class="library-item__subtitle">Artist · ${artist.followers} followers</span>
            </div>
            <button class="library-item__action">${Icons.moreHorizontal}</button>
          `;
          list.appendChild(item);
        });
        contentArea.appendChild(list);
      } else {
        const grid = createEl('div', 'library-grid');
        artists.forEach((artist, i) => {
          grid.appendChild(createArtistCard(artist, i));
        });
        contentArea.appendChild(grid);
      }
      break;

    case 'liked':
      const likedSongs = songs.filter(s => state.liked.has(s.id));
      if (likedSongs.length === 0) {
        contentArea.innerHTML = `
          <div style="text-align: center; padding: 64px 0; color: var(--text-secondary);">
            <div style="font-size: 3rem; margin-bottom: 16px;">💜</div>
            <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Songs you like will appear here</p>
            <p>Save songs by tapping the heart icon</p>
          </div>
        `;
      } else {
        const list = createEl('div', 'library-list');
        likedSongs.forEach(song => {
          list.appendChild(createSongListItem(song));
        });
        contentArea.appendChild(list);
      }
      break;
  }

  container.appendChild(contentArea);

  // ── View toggle handlers ──
  container.querySelector('#lib-view-list')?.addEventListener('click', () => {
    state.libraryView = 'list';
    renderLibrary(container);
  });
  container.querySelector('#lib-view-grid')?.addEventListener('click', () => {
    state.libraryView = 'grid';
    renderLibrary(container);
  });
}


// ══════════════════════════════════════════════════════════════════
// SHARED RENDERING HELPERS
// ══════════════════════════════════════════════════════════════════

function renderSection(container, title, contentFactory) {
  const section = createEl('div', 'section');
  section.innerHTML = `
    <div class="section__header">
      <h2 class="section__title">${title}</h2>
      <span class="section__see-all">See all</span>
    </div>
  `;
  section.appendChild(contentFactory());
  container.appendChild(section);
}

function renderCarouselSection(container, title, items, type) {
  const section = createEl('div', 'section');
  section.innerHTML = `
    <div class="section__header">
      <h2 class="section__title">${title}</h2>
      <span class="section__see-all">See all</span>
    </div>
  `;

  const wrapper = createEl('div', 'carousel-wrapper');
  const carousel = createEl('div', 'carousel');
  carousel.id = `carousel-${title.replace(/\s/g, '-').toLowerCase()}`;

  items.forEach((item, i) => {
    if (type === 'album') {
      carousel.appendChild(createAlbumCard(item, i));
    } else if (type === 'artist') {
      carousel.appendChild(createArtistCard(item, i));
    }
  });

  // Nav arrows
  const btnLeft = createEl('button', 'carousel-btn carousel-btn--left');
  btnLeft.innerHTML = Icons.chevronLeft;
  btnLeft.addEventListener('click', () => {
    carousel.scrollBy({ left: -400, behavior: 'smooth' });
  });

  const btnRight = createEl('button', 'carousel-btn carousel-btn--right');
  btnRight.innerHTML = Icons.chevronRight;
  btnRight.addEventListener('click', () => {
    carousel.scrollBy({ left: 400, behavior: 'smooth' });
  });

  wrapper.appendChild(btnLeft);
  wrapper.appendChild(carousel);
  wrapper.appendChild(btnRight);
  section.appendChild(wrapper);
  container.appendChild(section);
}

function createAlbumCard(album, index) {
  const card = createEl('div', 'card animate-in');
  card.style.animationDelay = `${index * 0.05}s`;
  card.innerHTML = `
    <div class="card__art-wrapper">
      <img class="card__art" src="${album.art}" alt="${album.title}" loading="lazy">
      <div class="card__play-overlay">${Icons.play}</div>
    </div>
    <div class="card__title">${album.title}</div>
    <div class="card__subtitle">${album.artist}</div>
  `;
  card.addEventListener('click', () => {
    const albumSongs = songs.filter(s => s.album.id === album.id);
    if (albumSongs.length > 0) playSong(albumSongs[0]);
  });
  return card;
}

function createArtistCard(artist, index) {
  const card = createEl('div', 'card card--round animate-in');
  card.style.animationDelay = `${index * 0.05}s`;
  card.innerHTML = `
    <div class="card__art-wrapper">
      <img class="card__art" src="${artist.art}" alt="${artist.name}" loading="lazy">
      <div class="card__play-overlay">${Icons.play}</div>
    </div>
    <div class="card__title">${artist.name}</div>
    <div class="card__subtitle">Artist</div>
  `;
  return card;
}

function createSongListItem(song) {
  const item = createEl('div', 'library-item');
  const isLiked = state.liked.has(song.id);
  const isPlaying = state.currentSong?.id === song.id;
  item.innerHTML = `
    <img class="library-item__art" src="${song.album.art}" alt="${song.title}">
    <div class="library-item__info">
      <span class="library-item__title" style="${isPlaying ? 'color: var(--accent-violet)' : ''}">${song.title}</span>
      <span class="library-item__subtitle">${song.artist} · ${formatTime(song.duration)}</span>
    </div>
    <button class="library-item__action" style="opacity: 1; color: ${isLiked ? 'var(--accent-pink)' : 'var(--text-muted)'}">
      ${isLiked ? Icons.heartFilled : Icons.heart}
    </button>
  `;
  item.addEventListener('click', (e) => {
    if (e.target.closest('.library-item__action')) {
      toggleLike(song.id);
      // Re-render based on page
      const container = document.getElementById('main-content');
      if (state.currentPage === 'library') renderLibrary(container);
      return;
    }
    playSong(song);
  });
  return item;
}


// ══════════════════════════════════════════════════════════════════
// NOW PLAYING CONTROLLER
// ══════════════════════════════════════════════════════════════════

function playSong(song) {
  state.currentSong = song;
  state.isPlaying = true;
  state.progress = 0;
  updateNowPlayingUI();
  startProgressSimulation();
}

function togglePlayPause() {
  state.isPlaying = !state.isPlaying;
  updateNowPlayingUI();
  if (state.isPlaying) {
    startProgressSimulation();
  } else {
    stopProgressSimulation();
  }
}

function playNext() {
  const currentIndex = songs.findIndex(s => s.id === state.currentSong?.id);
  let nextIndex;
  if (state.shuffle) {
    nextIndex = Math.floor(Math.random() * songs.length);
  } else {
    nextIndex = (currentIndex + 1) % songs.length;
  }
  playSong(songs[nextIndex]);
}

function playPrev() {
  if (state.progress > 3) {
    // Restart current song if more than 3 seconds in
    state.progress = 0;
    updateNowPlayingUI();
    return;
  }
  const currentIndex = songs.findIndex(s => s.id === state.currentSong?.id);
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(songs[prevIndex]);
}

function toggleShuffle() {
  state.shuffle = !state.shuffle;
  document.getElementById('np-shuffle')?.classList.toggle('active', state.shuffle);
}

function toggleRepeat() {
  const modes = ['off', 'all', 'one'];
  const currentIdx = modes.indexOf(state.repeat);
  state.repeat = modes[(currentIdx + 1) % modes.length];
  const btn = document.getElementById('np-repeat');
  if (btn) {
    btn.classList.toggle('active', state.repeat !== 'off');
    if (state.repeat === 'one') {
      btn.style.position = 'relative';
      if (!btn.querySelector('.repeat-one-badge')) {
        const badge = createEl('span', 'repeat-one-badge', '1');
        badge.style.cssText = 'position:absolute;top:2px;right:2px;font-size:8px;font-weight:700;color:var(--accent-violet);';
        btn.appendChild(badge);
      }
    } else {
      btn.querySelector('.repeat-one-badge')?.remove();
    }
  }
}

function toggleLike(songId) {
  if (state.liked.has(songId)) {
    state.liked.delete(songId);
  } else {
    state.liked.add(songId);
  }
  updateLikeButton();
}

function updateLikeButton() {
  const likeBtn = document.getElementById('np-like');
  if (likeBtn && state.currentSong) {
    const isLiked = state.liked.has(state.currentSong.id);
    likeBtn.classList.toggle('liked', isLiked);
    likeBtn.innerHTML = isLiked ? Icons.heartFilled : Icons.heart;
  }
}

function updateNowPlayingUI() {
  const song = state.currentSong;
  if (!song) return;

  // Song info
  document.getElementById('np-art').src = song.album.art;
  document.getElementById('np-art').alt = song.title;
  document.getElementById('np-title').textContent = song.title;
  document.getElementById('np-artist').textContent = song.artist;
  document.getElementById('np-total-time').textContent = formatTime(song.duration);
  document.getElementById('np-current-time').textContent = formatTime(state.progress);

  // Play/pause icon
  const playIcon = document.getElementById('np-play-icon');
  if (playIcon) {
    playIcon.innerHTML = state.isPlaying
      ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
      : '<path d="M8 5v14l11-7z"/>';
  }

  // Waveform
  const waveform = document.getElementById('np-waveform');
  if (waveform) {
    waveform.classList.toggle('paused', !state.isPlaying);
  }

  // Progress
  updateProgress();

  // Like
  updateLikeButton();
}

function updateProgress() {
  const song = state.currentSong;
  if (!song) return;

  const pct = (state.progress / song.duration) * 100;
  const progressFill = document.getElementById('np-progress-fill');
  const timeFill = document.getElementById('np-time-fill');
  const currentTime = document.getElementById('np-current-time');

  if (progressFill) progressFill.style.width = `${pct}%`;
  if (timeFill) timeFill.style.width = `${pct}%`;
  if (currentTime) currentTime.textContent = formatTime(state.progress);
}

function startProgressSimulation() {
  stopProgressSimulation();
  state.progressInterval = setInterval(() => {
    if (!state.isPlaying || !state.currentSong) return;
    state.progress += 0.5;
    if (state.progress >= state.currentSong.duration) {
      if (state.repeat === 'one') {
        state.progress = 0;
      } else {
        playNext();
        return;
      }
    }
    updateProgress();
  }, 500);
}

function stopProgressSimulation() {
  if (state.progressInterval) {
    clearInterval(state.progressInterval);
    state.progressInterval = null;
  }
}


// ══════════════════════════════════════════════════════════════════
// SIDEBAR PLAYLISTS
// ══════════════════════════════════════════════════════════════════

function renderSidebarPlaylists() {
  const container = document.getElementById('sidebar-playlists');
  if (!container) return;
  container.innerHTML = '';
  playlists.forEach(pl => {
    const item = createEl('div', 'sidebar__playlist-item');
    item.innerHTML = `${Icons.music} <span>${pl.title}</span>`;
    item.addEventListener('click', () => {
      if (pl.songs.length > 0) playSong(pl.songs[0]);
    });
    container.appendChild(item);
  });
}


// ══════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════════════════════

function initEventListeners() {
  // Nav
  document.querySelectorAll('.sidebar__nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.page));
  });

  // Now Playing controls
  document.getElementById('np-play')?.addEventListener('click', togglePlayPause);
  document.getElementById('np-next')?.addEventListener('click', playNext);
  document.getElementById('np-prev')?.addEventListener('click', playPrev);
  document.getElementById('np-shuffle')?.addEventListener('click', toggleShuffle);
  document.getElementById('np-repeat')?.addEventListener('click', toggleRepeat);
  document.getElementById('np-like')?.addEventListener('click', () => {
    if (state.currentSong) toggleLike(state.currentSong.id);
  });

  // Progress bar seeking
  document.getElementById('np-progress-bar')?.addEventListener('click', (e) => {
    if (!state.currentSong) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    state.progress = pct * state.currentSong.duration;
    updateProgress();
  });

  // Time bar seeking
  document.getElementById('np-time-bar')?.addEventListener('click', (e) => {
    if (!state.currentSong) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    state.progress = pct * state.currentSong.duration;
    updateProgress();
  });

  // Volume
  document.getElementById('np-volume')?.addEventListener('input', (e) => {
    state.volume = parseInt(e.target.value);
    updateVolumeIcon();
  });

  document.getElementById('np-vol-btn')?.addEventListener('click', () => {
    const slider = document.getElementById('np-volume');
    if (state.volume > 0) {
      state._prevVolume = state.volume;
      state.volume = 0;
      if (slider) slider.value = 0;
    } else {
      state.volume = state._prevVolume || 70;
      if (slider) slider.value = state.volume;
    }
    updateVolumeIcon();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Don't capture when typing in search
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        if (e.shiftKey) playNext();
        break;
      case 'ArrowLeft':
        if (e.shiftKey) playPrev();
        break;
    }
  });
}

function updateVolumeIcon() {
  const btn = document.getElementById('np-vol-btn');
  if (!btn) return;
  if (state.volume === 0) {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  } else if (state.volume < 50) {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  } else {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  }
}


// ══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════════

function init() {
  renderSidebarPlaylists();
  initEventListeners();
  navigate('home');
  updateNowPlayingUI();
}

// Launch
document.addEventListener('DOMContentLoaded', init);
