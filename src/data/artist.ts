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

/** Build image URL: uses Netlify Image CDN on Netlify, direct static path on Vercel / local */
export function img(file: string, width: number) {
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=80`
  }
  return `/img/${file}`
}

export interface ShowcaseTrack {
  id: string
  number: string
  title: string
  artist: string
  producer: string
  presentedBy: string
  duration: string
  currentTime: string
  progress: number
  spotifyUrl: string
  appleMusicUrl?: string
  youtubeUrl?: string
  coverImage: string
}

export const showcaseTracks: ShowcaseTrack[] = [
  {
    id: 'santra-market',
    number: '01',
    title: 'SANTRA MARKET',
    artist: 'Mayank',
    producer: 'Prod. by @MOH.O',
    presentedBy: 'Presented by Pataal Lok',
    duration: '3:45',
    currentTime: '1:24',
    progress: 0.37,
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'santra-market-cover.jpg',
  },
  {
    id: 'apocalypse',
    number: '02',
    title: 'APOCALYPSE',
    artist: 'Mayank',
    producer: 'Prod. by Mayank Music',
    presentedBy: 'The New Era • Nagpur',
    duration: '2:54',
    currentTime: '0:52',
    progress: 0.30,
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'apocalypse-cover.jpg',
  },
  {
    id: 'nagpur-anthem',
    number: '03',
    title: 'NAGPUR ANTHEM',
    artist: 'Mayank',
    producer: 'Prod. by 0712 Beats',
    presentedBy: 'NGP ∞ Desi Hip Hop',
    duration: '3:18',
    currentTime: '1:45',
    progress: 0.53,
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'apocalypse-poster.png',
  },
]

