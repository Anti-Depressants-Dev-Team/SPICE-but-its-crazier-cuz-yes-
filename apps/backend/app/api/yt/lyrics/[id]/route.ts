import type { NextRequest } from 'next/server';

import { jsonResponse, optionsResponse } from '@/lib/cors';
import { getTrackDetails } from '@/lib/youtube';

export const runtime = 'nodejs';

export function OPTIONS() {
  return optionsResponse();
}

function cleanTrackTitle(title: string): string {
  return title
    // Remove (Official Video), [Official Music Video], etc.
    .replace(/\s*[\(\[][^)]*official[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*video[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*audio[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*music video[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*visualizer[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*lyrics[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*lyric video[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*full audio[^)]*[\)\]]/gi, '')
    .replace(/\s*[\(\[][^)]*remastered[^)]*[\)\]]/gi, '')
    .trim();
}

interface LrcLibTrack {
  id: number;
  name: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics?: string;
  syncedLyrics?: string;
}

function generateThemedLyrics(title: string, artist: string, durationMs: number): { plainLyrics: string; syncedLyrics: string } {
  const durationSec = durationMs / 1000;
  const lines: { time: string; text: string }[] = [];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return `[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}]`;
  };

  // Add intro
  lines.push({ time: formatTime(0), text: `🎵 [Instrumental Intro]` });
  lines.push({ time: formatTime(Math.min(8, durationSec * 0.04)), text: `✨ Playing: ${title}` });
  if (artist) {
    lines.push({ time: formatTime(Math.min(15, durationSec * 0.08)), text: `🎤 By: ${artist}` });
  }

  // Mid-song sections based on total duration
  const sections = [
    `🎹 Let the music take over...`,
    `💫 Feeling the vibrations`,
    `🌟 Beautiful soundscape drifting in`,
    `⚡ SPICE Media Player Karaoke Mode`,
    `🔥 Absolute masterpiece flow`,
    `🌈 Vibrant waves of sound`,
    `🌌 Drifting into the music...`,
    `✨ Enjoying the groove`,
    `💫 Keeping the energy high`,
  ];

  const count = Math.max(5, Math.floor(durationSec / 30));
  for (let i = 0; i < count; i++) {
    const progress = (i + 1) / (count + 1); // values between ~0.15 and ~0.85
    const sec = durationSec * (0.12 + progress * 0.75);
    const text = sections[i % sections.length];
    lines.push({ time: formatTime(sec), text });
  }

  // Outro
  lines.push({ time: formatTime(durationSec * 0.92), text: `🌊 Fading out smoothly...` });
  lines.push({ time: formatTime(durationSec * 0.96), text: `🎵 [Instrumental Outro]` });

  const syncedLyrics = lines.map((l) => `${l.time} ${l.text}`).join('\n');
  const plainLyrics = lines.map((l) => l.text).join('\n');

  return { plainLyrics, syncedLyrics };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    // 1. Fetch details from YouTube
    const details = await getTrackDetails(id);
    const { title, artists, durationMs } = details.track;
    const durationSec = durationMs ? Math.round(durationMs / 1000) : 0;

    const primaryArtist = artists?.[0]?.name || '';
    const cleanedTitle = cleanTrackTitle(title);

    let plainLyrics = '';
    let syncedLyrics = '';
    let isFallback = false;

    // 2. Query LrcLib API
    if (cleanedTitle) {
      try {
        const queryParams = new URLSearchParams({
          track_name: cleanedTitle,
          artist_name: primaryArtist,
        });
        if (durationSec > 0) {
          queryParams.set('duration', String(durationSec));
        }

        // Attempt 1: Direct get endpoint
        const getUrl = `https://lrclib.net/api/get?${queryParams.toString()}`;
        const res = await fetch(getUrl, {
          headers: { 'User-Agent': 'SPICE-Music-Player/1.0 (GitHub/razva)' },
          signal: AbortSignal.timeout(4000), // 4s timeout
        });

        if (res.ok) {
          const data = (await res.json()) as LrcLibTrack;
          if (data.syncedLyrics) {
            syncedLyrics = data.syncedLyrics;
            plainLyrics = data.plainLyrics || '';
          }
        } else if (res.status === 404) {
          // Attempt 2: Fallback search if direct get fails
          const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(`${cleanedTitle} ${primaryArtist}`)}`;
          const searchRes = await fetch(searchUrl, {
            headers: { 'User-Agent': 'SPICE-Music-Player/1.0 (GitHub/razva)' },
            signal: AbortSignal.timeout(4000),
          });

          if (searchRes.ok) {
            const results = (await searchRes.json()) as LrcLibTrack[];
            // Try to find the first result that has synced lyrics
            const match = results.find((r) => r.syncedLyrics);
            if (match && match.syncedLyrics) {
              syncedLyrics = match.syncedLyrics;
              plainLyrics = match.plainLyrics || '';
            }
          }
        }
      } catch (err) {
        console.error('Failed fetching from LrcLib:', err);
      }
    }

    // 3. Fallback Generation if no synced lyrics found
    if (!syncedLyrics) {
      isFallback = true;
      const fallback = generateThemedLyrics(title, primaryArtist, durationMs || 180000);
      plainLyrics = fallback.plainLyrics;
      syncedLyrics = fallback.syncedLyrics;
    }

    return jsonResponse({
      trackId: id,
      title,
      artist: primaryArtist,
      durationMs: durationMs || 180000,
      plainLyrics,
      syncedLyrics,
      isFallback,
    });
  } catch (error) {
    console.error('Lyrics API error:', error);
    // If anything breaks, return a safe generated response so the app doesn't crash
    const fallback = generateThemedLyrics('Unknown Track', 'Unknown Artist', 180000);
    return jsonResponse({
      trackId: id,
      title: 'Unknown Track',
      artist: 'Unknown Artist',
      durationMs: 180000,
      plainLyrics: fallback.plainLyrics,
      syncedLyrics: fallback.syncedLyrics,
      isFallback: true,
      error: error instanceof Error ? error.message : 'Could not resolve track details',
    });
  }
}
