# MAYANK — Official Artist Site

The official website of **Mayank** (Mayank Rahate), a Desi Hip Hop (DHH) rapper from Nagpur, Maharashtra, India. It's a single-page artist site built around the *APOCALYPSE* era: a dark grunge look with blood-red accents, an embedded Spotify player, links to every platform, and a collaboration and sponsorship enquiry form.

Digital partner: [DGson](https://digitalsoan.com).

## Sections

- **Hero**: oversized MAYANK wordmark over the APOCALYPSE poster, with stream and watch buttons
- **Music**: the Spotify artist player embedded on the page, plus Apple Music and YouTube links
- **Apocalypse**: the cover art and teaser poster for the new era
- **About**: portrait and bio
- **Follow**: Spotify, Apple Music, YouTube and Instagram tiles
- **Collab**: phone, WhatsApp, email and an enquiry form (Netlify Forms)
- **Partner**: DGson

## Tech

TanStack Start (React 19), Tailwind CSS 4, Netlify Forms, and Netlify Image CDN for responsive WebP images. Fonts come from Google Fonts: Anton, Space Grotesk, Permanent Marker and Rozha One.

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Editing content

All names, links, phone numbers and emails live in `src/data/artist.ts`. Images are in `public/img/`.

Form submissions show up in the Netlify dashboard under **Forms → collab**. You can set up email notifications there.
