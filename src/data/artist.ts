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
