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
  audioUrl?: string
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
    audioUrl: '/audio/santra-market.mp4',
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'santra-market-cover.jpg',
  },
  {
    id: 'tell-me',
    number: '02',
    title: 'TELL ME',
    artist: 'Mayank Ft. Nade',
    producer: 'Prod. by Nade',
    presentedBy: 'AROMA EP • Pataal Lok',
    duration: '3:37',
    currentTime: '1:15',
    progress: 0.35,
    audioUrl: '/audio/tell-me.m4a',
    spotifyUrl: 'https://open.spotify.com/album/5cBehrrhVCbKHyzV5jwNAU',
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'tell-me-cover.jpg',
  },
  {
    id: 'radio',
    number: '03',
    title: 'RADIO',
    artist: 'Prathamesh X Mayank Ft. Nade',
    producer: 'Visuals by Xxception',
    presentedBy: 'Pataal Lok Music',
    duration: '3:39',
    currentTime: '1:20',
    progress: 0.36,
    audioUrl: '/audio/radio.m4a',
    spotifyUrl: links.spotify,
    appleMusicUrl:
      'https://music.apple.com/us/album/radio-feat-nade-single/1535492167',
    youtubeUrl: links.youtube,
    coverImage: 'radio-cover.jpg',
  },
  {
    id: 'aake-dekh',
    number: '04',
    title: 'AAKE DEKH',
    artist: 'Mayank',
    producer: 'Prod. by Ketan',
    presentedBy: 'Official Lyrical Video • Pataal Lok',
    duration: '2:21',
    currentTime: '0:48',
    progress: 0.34,
    audioUrl: '/audio/aroma-aadatein.m4a',
    spotifyUrl: links.spotify,
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'aake-dekh-cover.jpg',
  },
  {
    id: 'aroma-jukebox',
    number: '05',
    title: 'AROMA (EP JUKEBOX)',
    artist: 'Mayank',
    producer: 'Mayank & Nade',
    presentedBy: 'Debut EP • 4 Tracks • Pataal Lok',
    duration: '15:16',
    currentTime: '2:30',
    progress: 0.16,
    audioUrl: '/audio/aroma-chaand-tak.m4a',
    spotifyUrl: 'https://open.spotify.com/album/5cBehrrhVCbKHyzV5jwNAU',
    appleMusicUrl: links.appleMusic,
    youtubeUrl: links.youtube,
    coverImage: 'aroma-cover.jpg',
  },
]

