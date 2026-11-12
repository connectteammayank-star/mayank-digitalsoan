// Single source of truth for Mayank's public info, links and contact details.
// Edit here to update copy across the whole site.

export const artist = {
  name: 'Mayank',
  fullName: 'Mayank Rahate',
  genre: 'Desi Hip Hop',
  city: 'Nagpur',
  state: 'Maharashtra',
  country: 'India',
  instagramHandle: '@_.mayankmusic',
  youtubeHandle: '@mayank.music13',
  spotifyArtistId: '2kIJkf45V7zTyuosCJVbrQ',
}

export const links = {
  spotify: 'https://open.spotify.com/artist/2kIJkf45V7zTyuosCJVbrQ',
  appleMusic: 'https://music.apple.com/in/artist/mayank/1535679567',
  instagram: 'https://www.instagram.com/_.mayankmusic/',
  youtube: 'https://www.youtube.com/@mayank.music13',
}

export const contact = {
  phoneDisplay: '+91 73502 54181',
  phoneHref: 'tel:+917350254181',
  whatsappHref: 'https://wa.me/917350254181',
  email: 'connectteammayank@gmail.com',
}

export const partner = {
  name: 'DGson',
  role: 'Official Digital Partner',
  url: 'https://digitalsoan.com',
  domain: 'digitalsoan.com',
}

/** Build a Netlify Image CDN URL for a file in /public/img. */
export function img(file: string, width: number) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=80`
}

export interface ShowcaseTrack {
  id: string
  number: string
  title: string
  subtitle: string
  tagline: string
  genre: string
  year: string
  duration: string
  spotifyUrl: string
  appleMusicUrl?: string
  youtubeUrl?: string
  coverImage?: string
  isSpotifyEmbed?: boolean
}

export const showcaseTracks: ShowcaseTrack[] = [
  {
    id: 'apocalypse',
    number: '01',
    title: 'Apocalypse',
    subtitle: 'Lead Single • Era Opener',
    tagline: 'The city crumbles, the crown stays. Gritty 808s and Nagpur through a blood-red lens.',
    genre: 'DHH / Grunge',
    year: '2026',
    duration: '2:54',
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'apocalypse-cover.jpg',
  },
  {
    id: 'nagpur-anthem',
    number: '02',
    title: 'Nagpur Anthem',
    subtitle: '0712 Street Cypher',
    tagline: 'Raw bars putting Orange City on the global hip hop map. No borrowed accents. Just NGP ∞.',
    genre: 'Hardcore Hip Hop',
    year: '2025',
    duration: '3:18',
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'apocalypse-poster.png',
  },
  {
    id: 'discography',
    number: '03',
    title: 'Full Catalogue',
    subtitle: 'Spotify Live Player',
    tagline: 'Stream every single, drop, and feature directly from the official artist catalogue.',
    genre: 'Complete Discography',
    year: '2024–2026',
    duration: 'All Tracks',
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    isSpotifyEmbed: true,
  },
]

