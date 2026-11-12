import * as React from 'react'
import { ArrowUpRight, ChevronDown, MapPin, Music2 } from 'lucide-react'

import {
  AppleMusicIcon,
  Crown,
  SpotifyIcon,
  YouTubeIcon,
} from '@/components/brand-icons'
import {
  artist,
  img,
  links,
  showcaseTracks,
  type ShowcaseTrack,
} from '@/data/artist'

export function ScrollHeroShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [isReducedMotion, setIsReducedMotion] = React.useState(false)

  // Track scroll progression with requestAnimationFrame
  React.useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(motionQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false
            return
          }
          const rect = containerRef.current.getBoundingClientRect()
          const totalScroll = rect.height - window.innerHeight
          if (totalScroll <= 0) {
            ticking = false
            return
          }
          const current = -rect.top
          const p = Math.min(Math.max(current / totalScroll, 0), 1)
          setProgress(p)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Calculate 3D perspective transforms based on scroll progression
  const { rotateY, translateX, translateY, scale } = React.useMemo(() => {
    if (isReducedMotion) {
      return { rotateY: 0, translateX: 0, translateY: 0, scale: 1.05 }
    }

    let rY = 0
    let tX = 0
    let tY = 0
    let sc = 1.05

    if (progress < 0.22) {
      // Stage 0: Hero introduction
      const ratio = progress / 0.22
      rY = ratio * -2.5
      tX = ratio * -1.5
      tY = ratio * -1
      sc = 1.05 + ratio * 0.03
    } else if (progress < 0.5) {
      // Stage 1: Card 01 - APOCALYPSE
      const ratio = (progress - 0.22) / 0.28
      rY = -2.5 + ratio * -4.5 // -2.5 to -7.0 deg
      tX = -1.5 + ratio * -3.5 // -1.5% to -5.0%
      tY = -1 + ratio * -1.5
      sc = 1.08 + ratio * 0.04
    } else if (progress < 0.76) {
      // Stage 2: Card 02 - NAGPUR ANTHEM
      const ratio = (progress - 0.5) / 0.26
      rY = -7.0 + ratio * 13.5 // -7.0 to +6.5 deg
      tX = -5.0 + ratio * 9.5 // -5.0% to +4.5%
      tY = -2.5 + ratio * 2.0
      sc = 1.12 + ratio * 0.03
    } else {
      // Stage 3: Card 03 - SPOTIFY CATALOGUE
      const ratio = (progress - 0.76) / 0.24
      rY = 6.5 - ratio * 6.5 // 6.5 to 0.0 deg
      tX = 4.5 - ratio * 4.5 // 4.5% to 0.0%
      tY = -0.5 + ratio * 0.5
      sc = 1.15 - ratio * 0.08
    }

    return { rotateY: rY, translateX: tX, translateY: tY, scale: sc }
  }, [progress, isReducedMotion])

  // Determine current active stage
  const activeStage = React.useMemo(() => {
    if (progress < 0.22) return 0
    if (progress < 0.5) return 1
    if (progress < 0.76) return 2
    return 3
  }, [progress])

  // Smooth scroll jump to target stage
  const scrollToStage = (stageIndex: number) => {
    if (!containerRef.current) return
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY
    const totalScroll =
      containerRef.current.offsetHeight - window.innerHeight
    const stageBreakpoints = [0.0, 0.32, 0.62, 0.88]
    const targetY = containerTop + stageBreakpoints[stageIndex] * totalScroll
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  // Opacities for smooth crossfades between stages
  const heroOpacity = Math.max(0, 1 - progress / 0.22)
  const heroTranslate = -progress * 120

  const track1Opacity =
    progress < 0.2
      ? 0
      : progress < 0.32
        ? (progress - 0.2) / 0.12
        : progress < 0.44
          ? 1
          : Math.max(0, 1 - (progress - 0.44) / 0.08)

  const track2Opacity =
    progress < 0.48
      ? 0
      : progress < 0.58
        ? (progress - 0.48) / 0.1
        : progress < 0.7
          ? 1
          : Math.max(0, 1 - (progress - 0.7) / 0.08)

  const track3Opacity =
    progress < 0.74 ? 0 : Math.min(1, (progress - 0.74) / 0.12)

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative w-full h-[360vh] bg-background"
    >
      {/* Anchor for nav links targeting #music */}
      <div id="music" className="absolute top-[28%] pointer-events-none" />

      {/* Pinned 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-stage">
        {/* 3D Parallax Video & Image Background Stage */}
        <div
          className="absolute inset-0 -z-20 h-full w-full will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: isReducedMotion
              ? 'scale(1.05)'
              : `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(2)}%, ${translateY.toFixed(2)}%, 0) scale(${scale.toFixed(3)})`,
          }}
        >
          {/* Looping H.264 Cinematic Video of Mayank in Chair */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={img('apocalypse-poster.png', 1600)}
            className="absolute inset-0 h-full w-full object-cover object-[50%_60%] grayscale contrast-125"
          >
            <source src="/video/mayank-apocalypse.mp4" type="video/mp4" />
            <source src="/video/mayank-apocalypse.mov" type="video/quicktime" />
            {/* Fallback image */}
            <img
              src={img('apocalypse-poster.png', 1600)}
              alt="Mayank"
              className="h-full w-full object-cover object-[50%_62%] opacity-60 grayscale"
            />
          </video>
        </div>

        {/* Film grain and moody dark vignettes */}
        <div className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/65 to-background/25" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_95%)]" />

        {/* ============================================================= */}
        {/* STAGE 0: HERO INTRO (Active at top)                           */}
        {/* ============================================================= */}
        <div
          className="absolute inset-0 flex flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTranslate}px, 0)`,
            display: heroOpacity <= 0 ? 'none' : 'flex',
          }}
        >
          <div className="mx-auto w-full max-w-content pointer-events-auto">
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-primary" />
                {artist.city}, {artist.state}
              </span>
              <span className="hidden h-px w-10 bg-border sm:block" />
              <span>{artist.genre}</span>
            </div>

            <h1 className="relative font-display uppercase leading-[0.8] tracking-tight">
              <span className="sr-only">Mayank — Desi Hip Hop artist from Nagpur</span>
              <span
                aria-hidden="true"
                className="block text-[26vw] sm:text-[22vw] lg:text-[17rem] animate-flicker"
              >
                Mayank
              </span>
              <span
                aria-hidden="true"
                className="animate-slash absolute left-[2%] top-[46%] block h-[0.6vw] min-h-1.5 w-[96%] -rotate-[4deg] bg-primary shadow-[0_0_30px_var(--primary)]"
              />
            </h1>

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-lg text-foreground/80 sm:text-xl">
                Raw bars straight out of the Orange City.{' '}
                <span className="font-deva text-primary">नागपुर</span> on the
                map, one verse at a time.{' '}
                <span className="font-tag text-foreground">NGP ∞</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={links.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-primary px-6 py-4 font-display uppercase tracking-[0.2em] text-primary-foreground hover:bg-bone hover:text-ink transition-colors motion-reduce:transition-none"
                >
                  <SpotifyIcon className="size-5" />
                  Stream on Spotify
                </a>
                <button
                  type="button"
                  onClick={() => scrollToStage(1)}
                  className="inline-flex items-center gap-3 border border-foreground/40 px-6 py-4 font-display uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none"
                >
                  <Music2 className="size-5" />
                  Explore Music
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* STAGE 1: GLASS CARD 01 - APOCALYPSE                           */}
        {/* ============================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-end px-4 sm:px-12 lg:px-20 pointer-events-none transition-all duration-300"
          style={{
            opacity: track1Opacity,
            transform: `translate3d(${(1 - track1Opacity) * 50}px, 0, 0)`,
            display: track1Opacity <= 0 ? 'none' : 'flex',
          }}
        >
          <div className="w-full max-w-xl pointer-events-auto">
            <GlassTrackCard
              track={showcaseTracks[0]}
              onNext={() => scrollToStage(2)}
            />
          </div>
        </div>

        {/* ============================================================= */}
        {/* STAGE 2: GLASS CARD 02 - NAGPUR ANTHEM                        */}
        {/* ============================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-start px-4 sm:px-12 lg:px-20 pointer-events-none transition-all duration-300"
          style={{
            opacity: track2Opacity,
            transform: `translate3d(${(1 - track2Opacity) * -50}px, 0, 0)`,
            display: track2Opacity <= 0 ? 'none' : 'flex',
          }}
        >
          <div className="w-full max-w-xl pointer-events-auto">
            <GlassTrackCard
              track={showcaseTracks[1]}
              onNext={() => scrollToStage(3)}
              accentLeft
            />
          </div>
        </div>

        {/* ============================================================= */}
        {/* STAGE 3: GLASS CARD 03 - SPOTIFY PLAYER DASHBOARD             */}
        {/* ============================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none transition-all duration-300"
          style={{
            opacity: track3Opacity,
            transform: `scale(${0.95 + track3Opacity * 0.05})`,
            display: track3Opacity <= 0 ? 'none' : 'flex',
          }}
        >
          <div className="w-full max-w-2xl pointer-events-auto">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-3 items-center justify-center rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
                    03 // FULL CATALOGUE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <SpotifyIcon className="size-4 text-[#1DB954]" />
                  Official Spotify Player
                </div>
              </div>

              <div className="my-5">
                <h3 className="font-display text-4xl sm:text-5xl uppercase leading-none">
                  Press <span className="text-outline">Play.</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Run every single, drop, and feature directly right here, or on your preferred platform.
                </p>
              </div>

              {/* Embedded Spotify Player */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <iframe
                  title="Mayank on Spotify"
                  src={`https://open.spotify.com/embed/artist/${artist.spotifyArtistId}?utm_source=generator&theme=0`}
                  className="h-[360px] w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              {/* Platform links */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={links.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1DB954]/20 border border-[#1DB954]/40 px-3.5 py-1.5 text-xs uppercase tracking-wider text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-colors"
                  >
                    <SpotifyIcon className="size-3.5" />
                    Spotify
                  </a>
                  <a
                    href={links.appleMusic}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                  >
                    <AppleMusicIcon className="size-3.5" />
                    Apple Music
                  </a>
                  <a
                    href={links.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                  >
                    <YouTubeIcon className="size-3.5" />
                    YouTube
                  </a>
                </div>
                <span className="font-tag text-xs text-primary/80">Nagpur ∞ All Drops</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* INTERACTIVE NAVIGATION CONTROLS / STEPPER                     */}
        {/* ============================================================= */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 border border-white/15">
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground mr-1 hidden sm:inline">
            TIMELINE
          </span>
          {[
            { label: 'Hero', idx: 0 },
            { label: 'Apocalypse', idx: 1 },
            { label: 'Nagpur', idx: 2 },
            { label: 'Spotify', idx: 3 },
          ].map((item) => {
            const isActive = activeStage === item.idx
            return (
              <button
                key={item.idx}
                type="button"
                onClick={() => scrollToStage(item.idx)}
                aria-label={`Go to ${item.label}`}
                className={`group flex items-center gap-1.5 text-xs transition-all duration-300 ${
                  isActive
                    ? 'font-bold text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-7 h-2 bg-primary shadow-[0_0_12px_var(--primary)]'
                      : 'size-2 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Scroll hint icon at stage 0 */}
        {activeStage === 0 && (
          <div className="pointer-events-none absolute bottom-16 right-6 hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-bounce">
            <span>Scroll for music</span>
            <ChevronDown className="size-4 text-primary" />
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Glassmorphism Track Card Component                                 */
/* ------------------------------------------------------------------ */

function GlassTrackCard({
  track,
  onNext,
  accentLeft = false,
}: {
  track: ShowcaseTrack
  onNext?: () => void
  accentLeft?: boolean
}) {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
      {/* Subtle red accent glow in corner */}
      <div
        className={`pointer-events-none absolute -top-12 size-40 bg-primary/20 rounded-full blur-3xl ${
          accentLeft ? '-left-12' : '-right-12'
        }`}
      />

      {/* Header row: track number + audio equalizer visualizer */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-primary">
          <Crown className="size-3.5 text-primary" />
          <span>{track.number} // FEATURED TRACK</span>
        </div>

        {/* Animated Soundwave Equalizer Bars */}
        <div
          className="flex items-end gap-1 h-7 px-2 py-1 rounded bg-black/40 border border-white/5"
          aria-hidden="true"
        >
          <span className="w-1 bg-primary rounded-full animate-wave-1" />
          <span className="w-1 bg-primary/80 rounded-full animate-wave-2" />
          <span className="w-1 bg-primary rounded-full animate-wave-3" />
          <span className="w-1 bg-primary/90 rounded-full animate-wave-4" />
        </div>
      </div>

      {/* Body: Title, Subtitle, Story */}
      <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
        {track.coverImage && (
          <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-xl">
            <img
              src={img(track.coverImage, 300)}
              alt={track.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {track.subtitle}
          </p>
          <h3 className="mt-1 font-display text-4xl sm:text-5xl uppercase leading-[0.9] tracking-tight">
            {track.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            {track.tagline}
          </p>
        </div>
      </div>

      {/* Track meta tags */}
      <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
          {track.genre}
        </span>
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
          {track.year}
        </span>
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
          {track.duration}
        </span>
        <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-mono">
          NAGPUR ORIGIN
        </span>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10">
        <div className="flex flex-wrap gap-2.5">
          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-primary px-4 py-2 font-display text-xs uppercase tracking-[0.2em] text-primary-foreground hover:bg-bone hover:text-ink transition-colors"
          >
            <SpotifyIcon className="size-4" />
            Stream Track
          </a>
          {track.appleMusicUrl && (
            <a
              href={track.appleMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-display text-xs uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors"
            >
              <AppleMusicIcon className="size-4" />
              Apple
            </a>
          )}
          {track.youtubeUrl && (
            <a
              href={track.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-display text-xs uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors"
            >
              <YouTubeIcon className="size-4" />
              Video
            </a>
          )}
        </div>

        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-mono"
          >
            <span>Next Track</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
