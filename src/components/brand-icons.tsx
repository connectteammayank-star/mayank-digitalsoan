type IconProps = { className?: string }

export function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M6.5 9.2c3.8-1.2 8.1-.9 11.2.9M7.2 12.3c3.1-.9 6.6-.6 9.2.9M7.9 15.2c2.5-.7 5.1-.4 7.2.8"
        fill="none"
        stroke="var(--ink, #111)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AppleMusicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" />
      <path
        d="M15.5 5.5v9.2a2.3 2.3 0 1 1-1.5-2.15V8.4l-4.5 1v6.8a2.3 2.3 0 1 1-1.5-2.15V7.2z"
        fill="var(--ink, #111)"
      />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="currentColor" />
      <path d="M10 8.8v6.4l5.6-3.2z" fill="var(--ink, #111)" />
    </svg>
  )
}

export function Crown({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17h26M4 14 2 4l8 6 6-8 6 8 8-6-2 10z" />
    </svg>
  )
}
