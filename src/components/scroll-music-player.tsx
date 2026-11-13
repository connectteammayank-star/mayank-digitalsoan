import * as React from 'react'
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'

import { img, showcaseTracks, type ShowcaseTrack } from '@/data/artist'

function formatSeconds(secs: number): string {
  if (isNaN(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export function ScrollMusicPlayer() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const [progress, setProgress] = React.useState(0)
  const [playingTrackId, setPlayingTrackId] = React.useState<string | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false)
  const [audioTime, setAudioTime] = React.useState(0)
  const [audioDuration, setAudioDuration] = React.useState(30)
  const [likedTracks, setLikedTracks] = React.useState<Record<string, boolean>>({})
  const [isMuted, setIsMuted] = React.useState(false)
  const [isShuffle, setIsShuffle] = React.useState(false)
  const [isRepeat, setIsRepeat] = React.useState(false)

  // Track user scroll and scrub background video synchronously
  React.useEffect(() => {
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

          // Scrub video synchronously with scroll
          if (videoRef.current && videoRef.current.duration) {
            const targetTime = p * videoRef.current.duration
            videoRef.current.currentTime = targetTime
          }

          ticking = false
        })
        ticking = true
      }
    }

    const video = videoRef.current
    if (video) {
      video.pause()
      const onLoaded = () => handleScroll()
      video.addEventListener('loadedmetadata', onLoaded)
      video.addEventListener('canplay', onLoaded)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const total = showcaseTracks.length
  // Current active index based on scroll (0 through total - 1)
  const activeIndex = Math.min(
    total - 1,
    Math.max(0, Math.round(progress * (total - 1))),
  )

  // Audio Playback Controls
  const playTrack = (track: ShowcaseTrack) => {
    if (!audioRef.current || !track.audioUrl) return

    if (playingTrackId === track.id) {
      if (isAudioPlaying) {
        audioRef.current.pause()
        setIsAudioPlaying(false)
      } else {
        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {})
      }
      return
    }

    audioRef.current.src = track.audioUrl
    audioRef.current.currentTime = 0
    audioRef.current
      .play()
      .then(() => {
        setPlayingTrackId(track.id)
        setIsAudioPlaying(true)
      })
      .catch(() => {
        // Autoplay policy or format error
        setIsAudioPlaying(false)
      })
  }

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return
    setAudioTime(audioRef.current.currentTime)
    if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setAudioDuration(audioRef.current.duration)
    }
  }

  const handleAudioEnded = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
      return
    }

    // Auto-advance to next track
    const currentIndex = showcaseTracks.findIndex((t) => t.id === playingTrackId)
    if (currentIndex >= 0 && currentIndex < total - 1) {
      const nextIndex = isShuffle
        ? Math.floor(Math.random() * total)
        : currentIndex + 1
      jumpToTrack(nextIndex)
      playTrack(showcaseTracks[nextIndex])
    } else {
      setIsAudioPlaying(false)
      setPlayingTrackId(null)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, track: ShowcaseTrack) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))

    if (playingTrackId === track.id && audioRef.current && audioDuration > 0) {
      audioRef.current.currentTime = percent * audioDuration
      setAudioTime(percent * audioDuration)
    } else {
      playTrack(track)
      if (audioRef.current) {
        audioRef.current.currentTime = percent * 30
      }
    }
  }

  // Scroll smoothly to a specific track index
  const jumpToTrack = (index: number) => {
    if (!containerRef.current) return
    const clampedIndex = Math.max(0, Math.min(total - 1, index))
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight
    const targetScroll = containerTop + (clampedIndex / (total - 1)) * totalScroll
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  const toggleLike = (id: string) => {
    setLikedTracks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Card slide math: cards slide continuously right-to-left
  const cardWidth = 380
  const gap = 20
  const step = cardWidth + gap
  const centerOffset = -progress * (total - 1) * step

  return (
    <section
      ref={containerRef}
      id="music"
      className="relative w-full h-[420vh] bg-background"
    >
      {/* Hidden Audio Player Element */}
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end pb-8 sm:pb-12">
        {/* Background Video (Scrubbed with scroll) */}
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            poster={img('apocalypse-poster.png', 1600)}
            className="h-full w-full object-cover object-[50%_45%] grayscale contrast-125"
          >
            <source src="/video/mayank-apocalypse.mp4" type="video/mp4" />
            <source src="/video/mayank-apocalypse.mov" type="video/quicktime" />
            <img
              src={img('apocalypse-poster.png', 1600)}
              alt="Mayank"
              className="h-full w-full object-cover object-[50%_45%] grayscale"
            />
          </video>
        </div>

        {/* Film grain and dark gradients */}
        <div className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/30 to-transparent h-40 top-0" />

        {/* Top Header Label in the section */}
        <div className="absolute top-20 left-4 sm:left-8 z-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-primary font-mono font-bold">
            {showcaseTracks[activeIndex]?.number || '01'}
          </span>
          <span className="h-px w-8 bg-border" />
          <span>Now Playing • Scroll to scrub</span>
          {isAudioPlaying && (
            <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] text-primary font-mono lowercase tracking-normal">
              <span className="size-1.5 rounded-full bg-primary animate-ping" />
              preview playing
            </span>
          )}
        </div>

        {/* Horizontal Carousel Track of Glass Music Cards */}
        <div className="relative w-full overflow-visible flex items-center justify-center">
          <div
            className="flex items-center gap-5 transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(${centerOffset}px)`,
            }}
          >
            {showcaseTracks.map((track, idx) => {
              const dist = Math.abs(idx - progress * (total - 1))
              const isCurrent = idx === activeIndex
              const scale = Math.max(0.86, 1 - dist * 0.14)
              const opacity = Math.max(0.4, 1 - dist * 0.55)
              const isThisPlaying = playingTrackId === track.id && isAudioPlaying
              const isLiked = !!likedTracks[track.id]

              // Calculate scrubber position
              let displayProgress = track.progress
              let displayCurrentTime = track.currentTime
              let displayDuration = track.duration

              if (playingTrackId === track.id) {
                const fraction = audioDuration > 0 ? audioTime / audioDuration : 0
                displayProgress = Math.min(1, Math.max(0, fraction))
                displayCurrentTime = formatSeconds(audioTime)
                displayDuration = `${formatSeconds(audioDuration)} PREVIEW`
              }

              return (
                <div
                  key={track.id}
                  onClick={() => jumpToTrack(idx)}
                  className={`w-[88vw] max-w-[380px] shrink-0 transition-all duration-300 select-none cursor-pointer ${
                    isCurrent ? 'cursor-default' : ''
                  }`}
                  style={{
                    transform: `scale(${scale.toFixed(3)})`,
                    opacity: opacity.toFixed(3),
                  }}
                >
                  {/* Glassmorphic Music Player Card */}
                  <div
                    className={`rounded-3xl p-5 sm:p-6 backdrop-blur-3xl bg-neutral-900/50 border transition-all duration-300 relative overflow-hidden group ${
                      isThisPlaying
                        ? 'border-primary/60 shadow-[0_25px_60px_-15px_rgba(230,57,70,0.35)] ring-1 ring-primary/40'
                        : 'border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
                    }`}
                  >
                    {/* Top Row: Cover Art + Info + Heart & Share */}
                    <div className="flex items-start gap-4">
                      {/* Album Art Square */}
                      <div className="relative size-20 sm:size-24 shrink-0 rounded-2xl overflow-hidden shadow-md border border-white/10 group-hover:border-white/30 transition-all">
                        <img
                          src={img(track.coverImage, 300)}
                          alt={track.title}
                          className="size-full object-cover"
                        />
                        {/* Audio equalizer overlay when playing */}
                        {isThisPlaying && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-1">
                            <span className="w-1 h-4 bg-primary rounded-full animate-bounce" />
                            <span className="w-1 h-6 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-1 h-3 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                          </div>
                        )}
                      </div>

                      {/* Track Details */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-lg sm:text-xl font-bold tracking-wide text-white uppercase truncate">
                          {track.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/80 font-medium truncate mt-0.5">
                          {track.artist}
                        </p>
                        <p className="text-[11px] sm:text-xs text-white/60 truncate mt-1">
                          {track.producer}
                        </p>
                        <p className="text-[11px] sm:text-xs text-white/60 truncate flex items-center gap-1 mt-0.5">
                          <span>{track.presentedBy}</span>
                          <span className="text-xs">👹</span>
                        </p>
                      </div>

                      {/* Top-Right Action Icons */}
                      <div className="flex items-center gap-2 text-white/70">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(track.id)
                          }}
                          aria-label="Like"
                          className="p-1 hover:text-white transition-colors"
                        >
                          <Heart
                            className={`size-4 transition-colors ${
                              isLiked
                                ? 'fill-red-500 text-red-500'
                                : 'hover:text-red-400'
                            }`}
                          />
                        </button>
                        <a
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Open track link"
                          className="p-1 hover:text-white transition-colors"
                        >
                          <Share2 className="size-4" />
                        </a>
                      </div>
                    </div>

                    {/* Interactive Scrubber Progress Slider */}
                    <div className="mt-4">
                      <div
                        onClick={(e) => handleSeek(e, track)}
                        className="relative w-full h-2 group/scrub bg-white/15 hover:bg-white/25 rounded-full overflow-hidden cursor-pointer transition-all"
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-150 relative ${
                            isThisPlaying ? 'bg-primary' : 'bg-white'
                          }`}
                          style={{
                            width: `${(displayProgress * 100).toFixed(1)}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/60 font-mono mt-1.5">
                        <span className={isThisPlaying ? 'text-primary font-bold' : ''}>
                          {displayCurrentTime}
                        </span>
                        <span>{displayDuration}</span>
                      </div>
                    </div>

                    {/* Bottom Playback Controls */}
                    <div className="flex items-center justify-between mt-3 px-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsShuffle(!isShuffle)
                        }}
                        className={`transition-colors ${
                          isShuffle ? 'text-primary' : 'text-white/60 hover:text-white'
                        }`}
                        aria-label="Shuffle"
                      >
                        <Shuffle className="size-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          jumpToTrack(idx - 1)
                          if (isAudioPlaying && idx > 0) {
                            playTrack(showcaseTracks[idx - 1])
                          }
                        }}
                        className="text-white/90 hover:text-white transition-colors disabled:opacity-30"
                        disabled={idx === 0}
                        aria-label="Previous track"
                      >
                        <SkipBack className="size-5 fill-current" />
                      </button>

                      {/* Main Circular Play Button with Real Audio Playback */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          playTrack(track)
                        }}
                        className={`size-11 sm:size-12 rounded-full transition-all flex items-center justify-center text-white shadow-lg active:scale-95 ${
                          isThisPlaying
                            ? 'bg-primary hover:bg-primary/90 ring-4 ring-primary/30'
                            : 'bg-white/25 hover:bg-white/35'
                        }`}
                        aria-label={isThisPlaying ? 'Pause audio' : 'Play audio teaser'}
                      >
                        {isThisPlaying ? (
                          <Pause className="size-5 fill-current" />
                        ) : (
                          <Play className="size-5 fill-current ml-0.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          jumpToTrack(idx + 1)
                          if (isAudioPlaying && idx < total - 1) {
                            playTrack(showcaseTracks[idx + 1])
                          }
                        }}
                        className="text-white/90 hover:text-white transition-colors disabled:opacity-30"
                        disabled={idx === total - 1}
                        aria-label="Next track"
                      >
                        <SkipForward className="size-5 fill-current" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsRepeat(!isRepeat)
                          }}
                          className={`transition-colors ${
                            isRepeat ? 'text-primary' : 'text-white/60 hover:text-white'
                          }`}
                          aria-label="Repeat"
                        >
                          <Repeat className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className={`transition-colors ${
                            isMuted ? 'text-red-400' : 'text-white/60 hover:text-white'
                          }`}
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? (
                            <VolumeX className="size-4" />
                          ) : (
                            <Volume2 className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Pagination & Sparkle Indicator */}
        <div className="relative mt-6 flex items-center justify-center">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            {showcaseTracks.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  jumpToTrack(i)
                  if (isAudioPlaying) {
                    playTrack(showcaseTracks[i])
                  }
                }}
                aria-label={`Go to track ${i + 1}`}
                className={`transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 h-1.5 bg-primary rounded-full'
                    : 'size-1.5 bg-white/40 hover:bg-white/70 rounded-full'
                }`}
              />
            ))}
          </div>

          <div className="absolute right-6 sm:right-12 hidden sm:flex items-center gap-2 text-white/50 text-xs font-mono">
            <Sparkles className="size-4" />
            <span>SCROLL TO ADVANCE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
