import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Mail, MapPin, Menu, MessageCircle, Phone } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  AppleMusicIcon,
  Crown,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from '@/components/brand-icons'
import { CollabForm } from '@/components/collab-form'
import { artist, contact, img, links, partner } from '@/data/artist'

export const Route = createFileRoute('/')({
  component: Home,
})

const NAV = [
  { href: '#music', label: 'Music' },
  { href: '#apocalypse', label: 'Apocalypse' },
  { href: '#about', label: 'About' },
  { href: '#platforms', label: 'Follow' },
  { href: '#collab', label: 'Collab' },
]

const PLATFORMS = [
  {
    name: 'Spotify',
    handle: 'Mayank',
    cta: 'Stream now',
    href: links.spotify,
    Icon: SpotifyIcon,
  },
  {
    name: 'Apple Music',
    handle: 'Mayank',
    cta: 'Listen now',
    href: links.appleMusic,
    Icon: AppleMusicIcon,
  },
  {
    name: 'YouTube',
    handle: artist.youtubeHandle,
    cta: 'Watch & subscribe',
    href: links.youtube,
    Icon: YouTubeIcon,
  },
  {
    name: 'Instagram',
    handle: artist.instagramHandle,
    cta: 'Follow the movement',
    href: links.instagram,
    Icon: InstagramIcon,
  },
]

const MARQUEE = [
  'Desi Hip Hop',
  'NGP ∞',
  'Apocalypse',
  'नागपुर',
  'Mayank Music',
  'Maharashtra',
  'DHH',
  'Orange City',
]

function Home() {
  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Music />
        <Apocalypse />
        <About />
        <Platforms />
        <Collab />
        <Partner />
      </main>
      <Footer />
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <a
      href="#top"
      className="group flex flex-col items-center leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      aria-label="Mayank — back to top"
    >
      <Crown className="w-5 h-3 text-primary mb-0.5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none" />
      <span className="font-display text-2xl tracking-[0.35em] pl-[0.35em]">
        MAYANK
      </span>
    </a>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors motion-reduce:transition-none"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={links.spotify}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-primary px-4 py-2 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground hover:bg-bone hover:text-ink transition-colors motion-reduce:transition-none"
          >
            <SpotifyIcon className="size-4" />
            Listen
          </a>
          <Sheet>
            <SheetTrigger
              className="md:hidden inline-flex size-10 items-center justify-center border border-border hover:border-primary"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-ink border-l-border w-full sm:max-w-sm p-8"
            >
              <SheetTitle className="font-display text-3xl tracking-[0.3em]">
                MAYANK
              </SheetTitle>
              <SheetDescription className="font-tag text-primary">
                Nagpur · Desi Hip Hop
              </SheetDescription>
              <nav aria-label="Mobile" className="mt-10">
                <ul className="grid gap-5">
                  {NAV.map((n, i) => (
                    <li key={n.href}>
                      <SheetClose asChild>
                        <a
                          href={n.href}
                          className="flex items-baseline gap-4 font-display text-4xl uppercase hover:text-primary"
                        >
                          <span className="text-xs text-muted-foreground">
                            0{i + 1}
                          </span>
                          {n.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pt-16"
    >
      <img
        src={img('apocalypse-poster.png', 1600)}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_62%] opacity-60 grayscale"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)_95%)]" />

      <div className="mx-auto w-full max-w-content px-4 pb-14 sm:px-6 sm:pb-20">
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
            <a
              href={links.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-foreground/40 px-6 py-4 font-display uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none"
            >
              <YouTubeIcon className="size-5" />
              Watch
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-24 hidden rotate-6 font-tag text-2xl text-primary/80 lg:block">
        Desi Hip Hop
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div
      aria-hidden="true"
      className="relative -rotate-1 border-y-2 border-ink bg-primary py-3 text-primary-foreground"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center font-display text-2xl uppercase tracking-[0.15em] sm:text-3xl"
          >
            <span className="px-6">{t}</span>
            <Crown className="h-4 w-6 opacity-80" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-12 bg-border" />
      {children}
    </div>
  )
}

function Music() {
  return (
    <section id="music" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionLabel n="01">Now playing</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
              Press
              <br />
              <span className="text-outline">play.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Every track, every drop, every feature. Run the full catalogue
              right here, or take it with you on your platform of choice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlatformChip href={links.spotify} label="Spotify" Icon={SpotifyIcon} />
              <PlatformChip
                href={links.appleMusic}
                label="Apple Music"
                Icon={AppleMusicIcon}
              />
              <PlatformChip href={links.youtube} label="YouTube" Icon={YouTubeIcon} />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -rotate-1 bg-primary/20 blur-2xl" />
            <iframe
              title="Mayank on Spotify"
              src={`https://open.spotify.com/embed/artist/${artist.spotifyArtistId}?utm_source=generator&theme=0`}
              className="relative h-[452px] w-full rounded-xl border-0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PlatformChip({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: (p: { className?: string }) => React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none"
    >
      <Icon className="size-4" />
      {label}
    </a>
  )
}

/* ------------------------------------------------------------------ */

function Apocalypse() {
  return (
    <section
      id="apocalypse"
      className="grain relative isolate scroll-mt-16 overflow-hidden border-y border-border bg-ink py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 -z-10 select-none font-display text-[30vw] uppercase leading-none text-white/[0.03]"
      >
        Apocalypse
      </div>
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionLabel n="02">The new era</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto w-full max-w-lg">
            <img
              src={img('apocalypse-poster.png', 900)}
              alt="APOCALYPSE teaser poster: Mayank slumped in a leather armchair before a ruined Nagpur skyline under a full moon"
              className="absolute -right-4 top-10 w-[62%] rotate-6 border-4 border-bone shadow-2xl sm:-right-10"
              loading="lazy"
            />
            <img
              src={img('apocalypse-cover.jpg', 1000)}
              alt="APOCALYPSE cover art: halftone portrait of Mayank in wraparound shades with a graffiti NGP crown and red APOCALYPSE title"
              className="relative w-[80%] -rotate-3 shadow-[12px_12px_0_var(--primary)]"
              loading="lazy"
            />
          </div>

          <div>
            <p className="font-tag text-2xl text-primary">Mayank Music presents</p>
            <h2 className="mt-2 font-display text-6xl uppercase leading-[0.85] sm:text-8xl xl:text-9xl">
              Apoca
              <span className="text-primary">lypse</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg text-foreground/80">
              The city crumbles, the crown stays. <em>APOCALYPSE</em> is
              Mayank's darkest, hardest chapter yet: Nagpur through a
              blood-red lens, built for the ones who stayed standing.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Artist
                </dt>
                <dd className="mt-1 font-display text-xl uppercase">Mayank</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Label
                </dt>
                <dd className="mt-1 font-display text-xl uppercase">Mayank Music</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  From
                </dt>
                <dd className="mt-1 font-display text-xl uppercase">NGP</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={links.spotify}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-primary px-6 py-4 font-display uppercase tracking-[0.2em] text-primary-foreground hover:bg-bone hover:text-ink transition-colors motion-reduce:transition-none"
              >
                Listen on Spotify <ArrowUpRight className="size-4" />
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-foreground/40 px-6 py-4 font-display uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none"
              >
                Get updates <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-16 bg-bone text-ink"
    >
      <div className="mx-auto grid max-w-content lg:grid-cols-2">
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-[90vh]">
          <img
            src={img('mayank-portrait.jpg', 1200)}
            alt="Black-and-white portrait of Mayank in a black puffer jacket and dark sunglasses"
            className="absolute inset-0 h-full w-full object-cover object-top grayscale"
            loading="lazy"
          />
          <span className="absolute bottom-6 left-6 bg-primary px-3 py-1 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground">
            {artist.fullName}
          </span>
        </div>

        <div className="flex flex-col justify-center px-4 py-20 sm:px-10 lg:px-16">
          <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-ink/50">
            <span className="text-primary">03</span>
            <span className="h-px w-12 bg-ink/20" />
            The artist
          </div>
          <h2 className="font-display text-6xl uppercase leading-[0.88] sm:text-7xl xl:text-8xl">
            Born in
            <br />
            <span className="text-outline-ink">the Orange</span>
            <br />
            City.
          </h2>
          <div className="mt-8 grid gap-5 text-lg text-ink/75">
            <p>
              <strong className="text-ink">Mayank</strong>, born{' '}
              {artist.fullName}, is a Desi Hip Hop artist repping{' '}
              {artist.city}, {artist.state}, the heart of India.
            </p>
            <p>
              His sound sits where street-level storytelling meets heavy,
              cinematic production: unfiltered verses about the hustle,
              the city and the people who move with him. No borrowed
              accents. Just Nagpur, loud.
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-primary pl-5 font-tag text-3xl leading-snug">
            "Crown on the city. NGP forever."
          </blockquote>
          <ul className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em]">
            {['Rapper', 'Songwriter', 'DHH', 'Nagpur, MH'].map((t) => (
              <li key={t} className="border border-ink/30 px-3 py-1.5">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Platforms() {
  return (
    <section id="platforms" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionLabel n="04">Tap in</SectionLabel>
        <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
          Follow the <span className="text-primary">movement</span>
        </h2>
        <ul className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {PLATFORMS.map(({ name, handle, cta, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full items-center justify-between gap-6 bg-background p-8 transition-colors hover:bg-primary motion-reduce:transition-none sm:p-10"
              >
                <div className="flex items-center gap-6">
                  <Icon className="size-12 shrink-0 text-foreground" />
                  <div>
                    <p className="font-display text-3xl uppercase sm:text-4xl">
                      {name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                      {handle} · {cta}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="size-8 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Collab() {
  return (
    <section
      id="collab"
      className="relative scroll-mt-16 bg-bone py-24 text-ink sm:py-32"
    >
      <div className="mx-auto grid max-w-content gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-ink/50">
            <span className="text-primary">05</span>
            <span className="h-px w-12 bg-ink/20" />
            Collabs & sponsors
          </div>
          <h2 className="font-display text-6xl uppercase leading-[0.88] sm:text-7xl">
            Let's build
            <br />
            something <span className="text-primary">loud.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            Features, brand partnerships, sponsorships, live shows and press.
            Reach Team Mayank directly.
          </p>

          <ul className="mt-10 grid gap-3">
            <ContactRow
              href={contact.phoneHref}
              Icon={Phone}
              label="Call"
              value={contact.phoneDisplay}
            />
            <ContactRow
              href={contact.whatsappHref}
              Icon={MessageCircle}
              label="WhatsApp"
              value={contact.phoneDisplay}
              external
            />
            <ContactRow
              href={`mailto:${contact.email}`}
              Icon={Mail}
              label="Email"
              value={contact.email}
            />
          </ul>
        </div>

        <div className="border-2 border-ink bg-white/60 p-6 shadow-[10px_10px_0_var(--ink)] sm:p-10">
          <p className="mb-8 font-tag text-2xl">Drop the details 👇</p>
          <CollabForm />
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  href,
  Icon,
  label,
  value,
  external,
}: {
  href: string
  Icon: typeof Phone
  label: string
  value: string
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="group flex items-center gap-4 border-b border-ink/15 py-3 hover:border-primary"
      >
        <span className="flex size-11 shrink-0 items-center justify-center bg-ink text-bone transition-colors group-hover:bg-primary motion-reduce:transition-none">
          <Icon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-[0.25em] text-ink/50">
            {label}
          </span>
          <span className="block truncate font-display text-xl tracking-wide sm:text-2xl">
            {value}
          </span>
        </span>
      </a>
    </li>
  )
}

/* ------------------------------------------------------------------ */

function Partner() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <a
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full bg-white p-1 transition-transform hover:scale-105 motion-reduce:transition-none"
          >
            <img
              src={img('dgson-logo.png', 240)}
              alt="DGson logo"
              width={112}
              height={112}
              className="size-28"
              loading="lazy"
            />
          </a>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              {partner.role}
            </p>
            <p className="mt-2 font-display text-5xl uppercase">{partner.name}</p>
            <p className="mt-1 text-muted-foreground">
              Digital strategy, releases & growth for Mayank.
            </p>
          </div>
        </div>
        <a
          href={partner.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-border px-5 py-3 font-display uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors motion-reduce:transition-none"
        >
          {partner.domain} <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="grain relative overflow-hidden pt-16 pb-8">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <p
          aria-hidden="true"
          className="select-none font-display text-[22vw] uppercase leading-[0.8] text-outline opacity-30 lg:text-[16rem]"
        >
          Mayank
        </p>
        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {artist.fullName} · Mayank Music ·{' '}
            {artist.city}, {artist.country}
          </p>
          <ul className="flex items-center gap-5">
            {PLATFORMS.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="block text-muted-foreground hover:text-primary transition-colors motion-reduce:transition-none"
                >
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
          <p>
            Digital partner{' '}
            <a
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {partner.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
