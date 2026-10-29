"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const services = [
  { title: "Wedding planning", icon: "planning", image: "photo-1519741497674-611481863552" },
  { title: "Venue selection", icon: "venue", image: "photo-1519167758481-83f550bb49b3" },
  { title: "Décor & design", icon: "design", image: "photo-1519225421980-715cb0215aed" },
  { title: "Floral styling", icon: "florals", image: "photo-1464366400600-7168b8af9bc3" },
  { title: "Food & catering", icon: "dining", image: "photo-1511795409834-ef04bbd61622" },
  { title: "Photography & film", icon: "photography", image: "photo-1537633552985-df8429e8048b" },
  { title: "Entertainment", icon: "entertainment", image: "photo-1470229722913-7c0e2dbbafd3" },
  { title: "Destination weddings", icon: "destination", image: "photo-1507504031003-b417219a0fde" },
  { title: "DJ & live music", icon: "entertainment", image: "photo-1501386761578-eac5c94b800a" },
  { title: "Mehndi artists", icon: "florals", image: "photo-1519741497674-611481863552" },
  { title: "Bar & beverages", icon: "dining", image: "photo-1511795409834-ef04bbd61622" },
  { title: "Stage & production", icon: "design", image: "photo-1506157786151-b8491531f063" },
  { title: "Guest hospitality", icon: "venue", image: "photo-1519167758481-83f550bb49b3" },
  { title: "Transport & logistics", icon: "destination", image: "photo-1507504031003-b417219a0fde" },
  { title: "Bridal styling", icon: "photography", image: "photo-1537633552985-df8429e8048b" },
  { title: "Corporate & social events", icon: "planning", image: "photo-1511578314322-379afb476865" },
] as const;

type ServiceIconName = (typeof services)[number]["icon"];

const strategySteps = [
  { title: "Consult", description: "We listen to your vision, priorities, and budget.", icon: "consult" },
  { title: "Plan", description: "We shape a personal celebration plan with clear next steps.", icon: "plan" },
  { title: "Shortlist", description: "Explore curated venues, vendors, and design ideas.", icon: "shortlist" },
  { title: "Book", description: "We help coordinate selections, confirmations, and contracts.", icon: "book" },
  { title: "Manage", description: "We bring your trusted suppliers together and keep plans on track.", icon: "manage" },
  { title: "Execute", description: "On the day, we coordinate the details so you can be present.", icon: "execute" },
] as const;

type StrategyIconName = (typeof strategySteps)[number]["icon"];

const clientReviews = [
  {
    category: "Wedding planning",
    quote: "Add an approved client testimonial about the wedding planning experience here.",
    author: "Client name",
  },
  {
    category: "Venue & celebration",
    quote: "Add an approved Google review about the venue and celebration experience here.",
    author: "Client name",
  },
  {
    category: "Wedding design",
    quote: "Add an approved client testimonial about the decor and design experience here.",
    author: "Client name",
  },
  {
    category: "Destination wedding",
    quote: "Add an approved Google review about the destination wedding experience here.",
    author: "Client name",
  },
];

const galleryImages = [
  { title: "A garden wedding", category: "WEDDINGS", image: "photo-1519741497674-611481863552", alt: "Outdoor wedding ceremony in a garden" },
  { title: "A night to celebrate", category: "EVENTS", image: "photo-1519167758481-83f550bb49b3", alt: "Elegant event venue prepared for a celebration" },
  { title: "The dance floor", category: "DJ & MUSIC", image: "photo-1470229722913-7c0e2dbbafd3", alt: "Concert lights above a lively dance floor" },
  { title: "Details in bloom", category: "WEDDINGS", image: "photo-1519225421980-715cb0215aed", alt: "Wedding table decorated with flowers" },
  { title: "A beautiful setting", category: "EVENTS", image: "photo-1507504031003-b417219a0fde", alt: "Outdoor celebration venue at sunset" },
  { title: "Music after dark", category: "DJ & MUSIC", image: "photo-1501386761578-eac5c94b800a", alt: "Live music and lights at an evening event" },
  { title: "A moment together", category: "WEDDINGS", image: "photo-1537633552985-df8429e8048b", alt: "Newlyweds sharing a joyful moment" },
  { title: "Tables set for guests", category: "EVENTS", image: "photo-1464366400600-7168b8af9bc3", alt: "Celebration table with flowers and candlelight" },
  { title: "Lights and celebration", category: "DJ & MUSIC", image: "photo-1506157786151-b8491531f063", alt: "Colorful lights at a live music event" },
  { title: "An intimate ceremony", category: "WEDDINGS", image: "photo-1532712938310-34cb3982ef74", alt: "Romantic intimate wedding celebration" },
  { title: "A grand welcome", category: "EVENTS", image: "photo-1511578314322-379afb476865", alt: "Guests arriving at a beautifully arranged event" },
  { title: "Celebrate together", category: "DJ & MUSIC", image: "photo-1492684223066-81342ee5ff30", alt: "Crowd celebrating together at an event" },
  { title: "Candlelit details", category: "WEDDINGS", image: "photo-1511795409834-ef04bbd61622", alt: "Romantic candlelit wedding reception" },
  { title: "A day to remember", category: "EVENTS", image: "photo-1505373877841-8d25f7d46678", alt: "Guests enjoying a thoughtfully planned event" },
  { title: "The party begins", category: "DJ & MUSIC", image: "photo-1478737270239-2f02b77fc618", alt: "DJ performing beneath dramatic event lighting" },
  { title: "A celebration in color", category: "WEDDINGS", image: "photo-1465495976277-4387d4b0e4a6", alt: "Colorful wedding decorations and flowers" },
  { title: "Gathered around the table", category: "EVENTS", image: "photo-1517457373958-b7bdd4587205", alt: "Guests gathered around a celebration table" },
  { title: "Sound and lights", category: "DJ & MUSIC", image: "photo-1459749411175-04bf5292ceea", alt: "Stage lights and sound at a live event" },
  { title: "A joyful beginning", category: "WEDDINGS", image: "photo-1523438885200-e635ba2c371e", alt: "Couple celebrating their wedding day" },
  { title: "Moments with meaning", category: "EVENTS", image: "photo-1511795409834-ef04bbd61622", alt: "Elegant details arranged for a special event" },
].map((item) => ({
  ...item,
  src: `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=1000&q=85`,
}));

const faqs = [
  {
    question: "What kinds of celebrations do you plan?",
    answer:
      "We help shape weddings and wedding-weekend celebrations, from intimate gatherings to multi-day events. We’ll learn about your plans first and let you know how we can best support them.",
  },
  {
    question: "Can you help us find a venue?",
    answer:
      "Yes. We can help you explore venue options that suit your guest list, location, atmosphere and budget, then support the next planning steps.",
  },
  {
    question: "Do we need to have everything figured out before we contact you?",
    answer:
      "Not at all. A date, a rough guest count or even just a feeling is a lovely place to start. We can work through the details together.",
  },
  {
    question: "Can you work with our preferred vendors?",
    answer:
      "Of course. If you already have trusted creative partners, we’re happy to coordinate with them. We can also help you discover suppliers for the pieces still to be decided.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a note with a little about your celebration. We’ll arrange an introductory conversation, hear what matters to you and talk through possible next steps.",
  },
];

const heroSlides = [
  {
    eyebrow: "Every event has a story waiting to unfold. We turn your ideas into celebrations with their own character and purpose.",
    heading: "IT ALL STARTS WITH AN IDEA.",
    emphasis: "Weddings",
    caption: "Where your story begins",
    video: "https://assets.mixkit.co/videos/40584/40584-720.mp4",
    poster: "https://assets.mixkit.co/videos/40584/40584-thumb-360-0.jpg",
    credit: "Newlyweds walking through a garden",
  },
  {
    eyebrow: "From creative concepts to logistics, we bring every element together with a clear plan and a considered approach.",
    heading: "THE ART IS IN THE DETAILS.",
    emphasis: "For Two",
    caption: "A moment just for two",
    video: "https://assets.mixkit.co/videos/40601/40601-720.mp4",
    poster: "https://assets.mixkit.co/videos/40601/40601-thumb-360-0.jpg",
    credit: "Happy newlyweds posing",
  },
  {
    eyebrow: "Through careful coordination and seamless execution, we bring every detail to life at the right moment.",
    heading: "WHERE PLANS BECOME REALITY.",
    emphasis: "In Bloom",
    caption: "Every detail, thoughtfully chosen",
    video: "https://assets.mixkit.co/videos/5224/5224-720.mp4",
    poster: "https://assets.mixkit.co/videos/5224/5224-thumb-360-0.jpg",
    credit: "A decorated wedding table",
  },
  {
    eyebrow: "Behind every remarkable occasion is a team working in sync to create an experience that stays with you long after the event ends.",
    heading: "MADE TO BE REMEMBERED.",
    emphasis: "In Love",
    caption: "Together, in the moment",
    video: "https://assets.mixkit.co/videos/40593/40593-720.mp4",
    poster: "https://assets.mixkit.co/videos/40593/40593-thumb-360-0.jpg",
    credit: "Newlyweds smiling",
  },
];

const workVideos = [
  {
    title: "A garden celebration",
    location: "Goa · Wedding day",
    video: "https://assets.mixkit.co/videos/40584/40584-720.mp4",
    poster: "https://assets.mixkit.co/videos/40584/40584-thumb-360-0.jpg",
    alt: "Newlyweds walking together through a wedding garden",
  },
  {
    title: "A moment just for two",
    location: "The newlyweds · Couple portraits",
    video: "https://assets.mixkit.co/videos/40601/40601-720.mp4",
    poster: "https://assets.mixkit.co/videos/40601/40601-thumb-360-0.jpg",
    alt: "Newlyweds posing together in a garden",
  },
  {
    title: "Thoughtful table details",
    location: "The celebration · Décor",
    video: "https://assets.mixkit.co/videos/5224/5224-720.mp4",
    poster: "https://assets.mixkit.co/videos/5224/5224-thumb-360-0.jpg",
    alt: "Wedding table with flowers, candles, plates and gold cutlery",
  },
  {
    title: "Joy in every moment",
    location: "Wedding day · Newlywed portraits",
    video: "https://assets.mixkit.co/videos/40593/40593-720.mp4",
    poster: "https://assets.mixkit.co/videos/40593/40593-thumb-360-0.jpg",
    alt: "Newlyweds sharing a happy moment in a garden",
  },
  {
    title: "A celebration in bloom",
    location: "Wedding day · Garden ceremony",
    video: "https://assets.mixkit.co/videos/40584/40584-720.mp4",
    poster: "https://assets.mixkit.co/videos/40584/40584-thumb-360-0.jpg",
    alt: "Sample wedding film of a couple in a garden",
  },
  {
    title: "Together, just married",
    location: "Couple portraits · Wedding day",
    video: "https://assets.mixkit.co/videos/40601/40601-720.mp4",
    poster: "https://assets.mixkit.co/videos/40601/40601-thumb-360-0.jpg",
    alt: "Sample wedding film of newlyweds posing together",
  },
  {
    title: "Details made memorable",
    location: "Reception · Tablescape",
    video: "https://assets.mixkit.co/videos/5224/5224-720.mp4",
    poster: "https://assets.mixkit.co/videos/5224/5224-thumb-360-0.jpg",
    alt: "Sample wedding film of reception details",
  },
  {
    title: "The newlywed glow",
    location: "Wedding day · Couple portraits",
    video: "https://assets.mixkit.co/videos/40593/40593-720.mp4",
    poster: "https://assets.mixkit.co/videos/40593/40593-thumb-360-0.jpg",
    alt: "Sample wedding film of a newlywed couple",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-[180ms] group-hover:translate-x-1 ${diagonal ? "-rotate-45" : ""}`}
    >
      <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const commonProps = {
    "aria-hidden": true as const,
    className: "h-9 w-9",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.4,
    viewBox: "0 0 40 40",
  };

  return (
    <svg {...commonProps}>
      {name === "planning" && <><rect x="8" y="10" width="24" height="22" rx="2" /><path d="M14 7v6m12-6v6M8 17h24m-17 6 3 3 7-7" /></>}
      {name === "venue" && <><path d="M7 32h26M10 32V15l10-7 10 7v17M16 32V21h8v11M14 17h.01M26 17h.01" /></>}
      {name === "design" && <><path d="M20 6 23.5 16.5 34 20l-10.5 3.5L20 34l-3.5-10.5L6 20l10.5-3.5L20 6Z" /><path d="m30 7 1.2 3.8L35 12l-3.8 1.2L30 17l-1.2-3.8L25 12l3.8-1.2L30 7Z" /></>}
      {name === "florals" && <><path d="M20 20c-7-2-8-10-2-12 5 1 6 7 2 12Zm0 0c2-7 10-8 12-2-1 5-7 6-12 2Zm0 0c7 2 8 10 2 12-5-1-6-7-2-12Zm0 0c-2 7-10 8-12 2 1-5 7-6 12-2Zm0 0v15m0-7c-3-3-6-3-8-2" /></>}
      {name === "dining" && <><path d="M9 7v11m4-11v11m-7-5h10M11 18v15m13-26v24m0-24c6 4 6 11 0 14" /></>}
      {name === "photography" && <><path d="M7 13h6l2-3h10l2 3h6v19H7V13Z" /><circle cx="20" cy="22" r="6" /><path d="M29 17h.01" /></>}
      {name === "entertainment" && <><path d="M16 29V10l16-3v19M16 15l16-3" /><ellipse cx="11" cy="30" rx="5" ry="3" /><ellipse cx="27" cy="27" rx="5" ry="3" /></>}
      {name === "destination" && <><circle cx="20" cy="18" r="10" /><path d="M20 28v5m-6 0h12m-10-15 3 3 6-7" /></>}
    </svg>
  );
}

function StrategyIcon({ name }: { name: StrategyIconName }) {
  const commonProps = {
    "aria-hidden": true as const,
    className: "h-8 w-8 sm:h-9 sm:w-9",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.6,
    viewBox: "0 0 40 40",
  };

  return (
    <svg {...commonProps}>
      {name === "consult" && <><circle cx="20" cy="13" r="6" /><path d="M8 33c1-7 5-10 12-10s11 3 12 10H8Z" /></>}
      {name === "plan" && <><path d="M11 8h14l6 6v18H11z" /><path d="M24 8v7h7m-15 9 10-10 4 4-10 10-5 1z" /></>}
      {name === "shortlist" && <><rect x="7" y="7" width="11" height="11" rx="1" /><rect x="22" y="7" width="11" height="11" rx="1" /><rect x="7" y="22" width="11" height="11" rx="1" /><rect x="22" y="22" width="11" height="11" rx="1" /><path d="m9 12 2 2 4-4" /></>}
      {name === "book" && <><circle cx="20" cy="20" r="13" /><path d="m14 20 4 4 8-9" /></>}
      {name === "manage" && <><circle cx="20" cy="9" r="4" /><circle cx="9" cy="30" r="3" /><circle cx="20" cy="30" r="3" /><circle cx="31" cy="30" r="3" /><path d="M20 13v9M9 22h22m-22 0v5m11-5v5m11-5v5" /></>}
      {name === "execute" && <><rect x="11" y="9" width="18" height="25" rx="2" /><path d="M16 9V6h8v3m-9 8 2 2 3-4m2 3h4m-11 5 2 2 3-4m2 3h4m-11 5 2 2 3-4m2 3h4" /></>}
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute z-10 top-0 left-0 flex w-full h-[94px] items-center justify-between border-b border-[#e3ba6f]/25 bg-[#090908] px-[7.3%] text-white shadow-[0_8px_24px_rgba(9,9,8,0.16)] max-[760px]:top-[14px] max-[760px]:right-[14px] max-[760px]:left-[14px] max-[760px]:w-auto max-[760px]:h-[78px] max-[760px]:px-[6%] min-[761px]:max-[900px]:h-[78px] min-[761px]:max-[900px]:px-[6%] min-[761px]:max-[1000px]:px-[5%]">
      <a aria-label="WEDTEC EVENTS home" className="inline-flex flex-col items-center gap-[5px] h-auto " href="#home" onClick={closeMenu}>
        <BrandLogo className="h-auto w-[240px] max-sm:w-[158px]" />
      </a>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="hidden relative z-[12] w-[42px] h-[42px] cursor-pointer flex-col items-center justify-center gap-[6px] border border-white/60 bg-transparent text-white max-[760px]:flex min-[761px]:max-[900px]:flex"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="h-px w-[15px] bg-current" />
        <span className="h-px w-[15px] bg-current" />
      </button>
      <nav
        className={`flex items-center gap-[clamp(24px,3.2vw,52px)] text-[11px] tracking-[0.06em] max-[760px]:absolute max-[760px]:top-0 max-[760px]:right-0 max-[760px]:left-0 max-[760px]:hidden max-[760px]:items-stretch max-[760px]:gap-0 max-[760px]:bg-[#090908] max-[760px]:px-[8%] max-[760px]:pt-[90px] max-[760px]:pb-[30px] max-[760px]:text-[13px] min-[761px]:max-[900px]:absolute min-[761px]:max-[900px]:top-0 min-[761px]:max-[900px]:right-0 min-[761px]:max-[900px]:left-0 min-[761px]:max-[900px]:hidden min-[761px]:max-[900px]:items-stretch min-[761px]:max-[900px]:gap-0 min-[761px]:max-[900px]:bg-[#090908] min-[761px]:max-[900px]:px-[8%] min-[761px]:max-[900px]:pt-[90px] min-[761px]:max-[900px]:pb-[30px] min-[761px]:max-[900px]:text-[13px] ${menuOpen ? "!flex flex-col" : ""}`}
        aria-label="Main navigation"
      >
        <a className="transition-opacity hover:opacity-[0.68] max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#about" onClick={closeMenu}>About us</a>
        <a className="transition-opacity hover:opacity-[0.68] max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#services" onClick={closeMenu}>Services</a>
        <a className="transition-opacity hover:opacity-[0.68] max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#work" onClick={closeMenu}>Our work</a>
        <a className="transition-opacity hover:opacity-[0.68] max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#gallery" onClick={closeMenu}>Gallery</a>
        <a className="transition-opacity hover:opacity-[0.68] max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#results" onClick={closeMenu}>Our results</a>
        <a className="flex items-center gap-[9px] transition-opacity hover:opacity-[0.68] max-[760px]:justify-between max-[760px]:border-t max-[760px]:border-white/15 max-[760px]:py-4 min-[761px]:max-[900px]:justify-between min-[761px]:max-[900px]:border-t min-[761px]:max-[900px]:border-white/15 min-[761px]:max-[900px]:py-4" href="#contact" onClick={closeMenu}>
          Let&apos;s talk <ArrowIcon diagonal />
        </a>
      </nav>
    </header>
  );
}

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const slide = heroSlides[activeSlide];

  const selectSlide = (index: number) => {
    setActiveSlide(index);
    setPlaybackFailed(false);
  };

  const showNextSlide = () => {
    selectSlide((activeSlide + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-svh min-h-[760px] max-h-[1020px] overflow-hidden bg-[#3c000c] text-white max-[760px]:h-auto max-[760px]:min-h-0 max-[760px]:max-h-none max-[760px]:overflow-hidden max-[760px]:bg-[#ffecd1] max-[760px]:text-[#3c000c] max-[760px]:px-[14px] max-[760px]:pt-[14px] max-[760px]:pb-[28px]" id="home">
      <div className="hero-media absolute inset-0 overflow-hidden bg-[#3c000c] max-[760px]:top-[14px] max-[760px]:right-[14px] max-[760px]:left-[14px] max-[760px]:h-[var(--hero-mobile-media-height)] max-[760px]:rounded-xl" aria-hidden="true">
        <video
          key={slide.video}
          className="h-full w-full object-cover max-[760px]:[object-position:center_43%]"
          autoPlay={!playbackFailed}
          muted
          playsInline
          preload="auto"
          poster={slide.poster}
          onEnded={showNextSlide}
          onError={() => setPlaybackFailed(true)}
          aria-label={slide.credit}
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade absolute inset-0 max-[760px]:top-[14px] max-[760px]:right-[14px] max-[760px]:left-[14px] max-[760px]:h-[var(--hero-mobile-media-height)] max-[760px]:rounded-xl" />
      <div className="absolute z-[1] top-1/2 right-[5%] flex -translate-y-1/2 flex-col items-center gap-[10px] max-[760px]:top-[calc(14px_+_var(--hero-mobile-media-height)*0.5)] max-[760px]:right-[28px]" role="group" aria-label="Choose a featured wedding video">
          {heroSlides.map((item, index) => (
            <button
              aria-label={`Show video ${index + 1}: ${item.caption}`}
              aria-current={index === activeSlide ? "true" : undefined}
              className={`h-[10px] w-[10px] cursor-pointer rounded-full border border-white/85 p-0 transition-[background-color,transform] duration-[180ms] hover:scale-125 ${index === activeSlide ? "bg-white" : "bg-transparent"}`}
              key={item.video}
              onClick={() => selectSlide(index)}
              type="button"
            />
          ))}
      </div>
      <div className="absolute z-[1] right-0 bottom-[11%] left-0 mx-auto grid w-[min(1160px,82%)] grid-cols-[1.05fr_1fr] items-end gap-10 min-[761px]:max-[900px]:w-[88%] min-[761px]:max-[900px]:grid-cols-1 min-[761px]:max-[900px]:gap-7 max-[760px]:relative max-[760px]:right-auto max-[760px]:bottom-auto max-[760px]:left-auto max-[760px]:mt-[calc(var(--hero-mobile-media-height)_+_32px)] max-[760px]:w-full max-[760px]:grid-cols-1 max-[760px]:gap-[14px] max-[760px]:text-center">
        <motion.div
          className="max-w-[610px] max-[760px]:max-w-none min-[761px]:max-[900px]:max-w-[650px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
          }}
        >
    
          <motion.h1
            key={slide.heading}
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="mb-[15px] max-w-[610px] font-serif text-[clamp(38px,4.7vw,56px)] font-normal tracking-[-0.045em] leading-[1.12] text-white max-[760px]:max-w-none max-[760px]:text-[clamp(38px,9vw,52px)] max-[760px]:text-[#3c000c]"
          >
            {slide.heading}
            <br />
            {/* <em className="font-normal">{slide.emphasis}</em> */}
          </motion.h1>
                <motion.p
            className="block text-[14px] tracking-[0.2em] leading-[1.5] mb-[15px] text-white/85 max-[760px]:hidden"
            key={`${slide.heading}-eyebrow`}
            initial="hidden"
            animate="visible"
            variants={reveal}
          >
            {slide.eyebrow}
          </motion.p>
        </motion.div>
        <div className="flex flex-col gap-6 pb-[5px] max-[760px]:gap-3">
          <div className="grid grid-cols-3 gap-[15px] max-[760px]:gap-[7px]" aria-label="Our planning approach">
            <div className="flex flex-col gap-[7px] max-[760px]:items-center max-[760px]:gap-1"><strong className="font-serif text-[clamp(15px,1.45vw,21px)] font-normal tracking-[-0.02em] max-[760px]:text-[clamp(11px,3.3vw,14px)] max-[760px]:leading-[1.15]">Personalised planning</strong><span className="text-[10px] leading-[1.45] text-white/85 max-[760px]:text-[clamp(7px,2.15vw,9px)] max-[760px]:leading-[1.25] max-[760px]:text-[#615d55]">From first idea to final detail</span></div>
            <div className="flex flex-col gap-[7px] max-[760px]:items-center max-[760px]:gap-1"><strong className="font-serif text-[clamp(15px,1.45vw,21px)] font-normal tracking-[-0.02em] max-[760px]:text-[clamp(11px,3.3vw,14px)] max-[760px]:leading-[1.15]">Venue & design</strong><span className="text-[10px] leading-[1.45] text-white/85 max-[760px]:text-[clamp(7px,2.15vw,9px)] max-[760px]:leading-[1.25] max-[760px]:text-[#615d55]">Spaces shaped around your vision</span></div>
            <div className="flex flex-col gap-[7px] max-[760px]:items-center max-[760px]:gap-1"><strong className="font-serif text-[clamp(15px,1.45vw,21px)] font-normal tracking-[-0.02em] max-[760px]:text-[clamp(11px,3.3vw,14px)] max-[760px]:leading-[1.15]">Seamless execution</strong><span className="text-[10px] leading-[1.45] text-white/85 max-[760px]:text-[clamp(7px,2.15vw,9px)] max-[760px]:leading-[1.25] max-[760px]:text-[#615d55]">Every detail, perfectly in place</span></div>
          </div>
          <div className="flex items-center gap-3 max-[760px]:gap-2">
            <a className="inline-flex min-h-[50px] items-center justify-center gap-[25px] px-[22px] text-[10px] tracking-[0.07em] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 min-h-[58px] flex-1 justify-between bg-[#3c000c] px-6 text-[12px] font-semibold tracking-normal hover:bg-[#430914] max-[760px]:min-h-12 max-[760px]:justify-center max-[760px]:gap-[10px] max-[760px]:px-[10px] max-[760px]:text-[clamp(10px,3vw,12px)] max-[760px]:text-white text-white! rounded-2xl" href="#contact">
              Start your wedding planning <ArrowIcon />
            </a>
            <a
              aria-label="Contact WEDTEC EVENTS on WhatsApp"
              className="grid h-[58px] w-[58px] flex-[0_0_58px] place-items-center rounded-[13px] bg-[#08bf58] transition hover:-translate-y-0.5 hover:bg-[#079b49] max-[760px]:h-12 max-[760px]:w-12 max-[760px]:flex-[0_0_48px] max-[760px]:rounded-[11px]"
              href="https://wa.me/?text=Hello%20WEDTEC%20EVENTS%2C%20I%27d%20love%20to%20talk%20about%20my%20wedding."
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" className="h-[30px] w-[30px] max-[760px]:h-[26px] max-[760px]:w-[26px]" viewBox="0 0 24 24" fill="none">
                <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L3.5 20l1.1-4.4a8.2 8.2 0 1 1 15.6-3.8Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M8.6 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .5l-.5.7c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.3.4.5 0 .5-.2 1-.6 1.3-.5.4-1.1.6-1.7.5-1-.1-2.2-.7-3.5-1.8-1.1-1-2-2.3-2.3-3.4-.2-.7-.1-1.4.3-2Z" fill="white" />
              </svg>
            </a>
          </div>
        </div>
      </div>
   
    </section>
  );
}

export function OurWorkSection() {
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const workTrackRef = useRef<HTMLDivElement>(null);

  const scrollWork = (direction: -1 | 1) => {
    const track = workTrackRef.current;
    if (track) {
      track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#ffecd1] py-[100px] md:py-[125px]" id="work">
      <div className="relative z-[1] mx-auto w-[min(1120px,86%)] min-[761px]:max-[1000px]:w-[88%]">
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#3c000c]">A FEW FAVOURITE MOMENTS</span>
          <h2 className="mx-auto mb-4 mt-4 max-w-[740px] font-serif text-[clamp(38px,5vw,62px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]">
            Our work, made <em className="text-[#3c000c]">with meaning.</em>
          </h2>
          <p className="mx-auto mb-0 max-w-[580px] text-[12px] leading-[1.9] text-[#77736c]">
            A glimpse of the celebrations we bring to life—each one thoughtfully planned around
            the people, places and little details that make it yours.
          </p>
        </motion.div>
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
          ref={workTrackRef}
          aria-label="Wedding celebration films"
        >
          {workVideos.map((item, index) => {
            const isPlaying = activeWork === index;
            return (
              <motion.button
                className="group relative aspect-[0.62] w-[72vw] shrink-0 snap-start overflow-hidden rounded-[5px] bg-[#3c000c] text-left text-white shadow-[0_12px_30px_rgba(37,35,31,0.12)] sm:w-[40vw] lg:w-[calc((100%-4.5rem)/4)]"
                key={item.title}
                onBlur={() => setActiveWork(null)}
                onClick={() => setActiveWork(isPlaying ? null : index)}
                onFocus={() => setActiveWork(index)}
                onMouseEnter={() => setActiveWork(index)}
                onMouseLeave={() => setActiveWork(null)}
                type="button"
                aria-label={`${isPlaying ? "Pause preview of" : "Preview"} ${item.title}`}
                aria-pressed={isPlaying}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url("${item.poster}")` }}
                />
                {isPlaying && (
                  <video
                    autoPlay
                    className="absolute inset-0 h-full w-full object-cover"
                    loop
                    muted
                    playsInline
                    poster={item.poster}
                    preload="auto"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="mb-2 block text-[8px] tracking-[0.18em] text-white/75 sm:text-[9px]">
                    WEDTEC EVENTS
                  </span>
                  <span className="block font-serif text-[clamp(17px,2vw,26px)] leading-tight">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-[9px] text-white/75 sm:text-[11px]">
                    {item.location}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-5 flex justify-center gap-3">
          <button
            aria-label="Scroll to previous wedding films"
            className="grid size-10 place-items-center rounded-full border border-[#3c000c]/20 bg-white text-[#3c000c] transition hover:bg-[#3c000c] hover:text-white"
            onClick={() => scrollWork(-1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">‹</span>
          </button>
          <button
            aria-label="Scroll to more wedding films"
            className="grid size-10 place-items-center rounded-full border border-[#3c000c]/20 bg-white text-[#3c000c] transition hover:bg-[#3c000c] hover:text-white"
            onClick={() => scrollWork(1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">›</span>
          </button>
        </div>
        <div className="mt-8 text-center">
          <a className="group inline-flex items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em]" href="#contact">
            Create a celebration like this <ArrowIcon />
          </a>
        </div>
      </div>
    
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-[#ffecd1] py-[105px] md:py-[125px]" id="services">
      <div className="mx-auto w-[min(1120px,82%)] max-[760px]:w-[86%] min-[761px]:max-[1000px]:w-[88%]">
        <motion.div
          className="mx-auto mb-10 max-w-[700px] text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] leading-[1.5] text-[#3c000c]">WEDDINGS & EVENTS, THOUGHTFULLY PLANNED</span>
          <h2 className="mt-[17px] font-serif text-[clamp(38px,4.7vw,56px)] font-normal tracking-[-0.045em] leading-[1.12] text-[#3c000c]">
            Everything your celebration <em className="font-normal text-[#3c000c]">needs.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[570px] text-[12px] leading-[1.9] text-[#77736c]">
            From the first idea to the final dance, our team brings every detail together so you can be fully present for the moments that matter.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              className="group relative flex min-h-[170px] flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-white/30 px-3 py-6 text-center text-white shadow-[0_8px_24px_rgba(37,35,31,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(37,35,31,0.2)] sm:min-h-[200px] sm:gap-5 sm:px-5 sm:py-8"
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <Image
                alt=""
                aria-hidden="true"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:scale-110"
                src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=800&q=85`}
                fill
                sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 23vw"
              />
              <span className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/65" />
              <span className="relative z-[1] grid size-[58px] place-items-center rounded-full border border-[#e3ba6f] bg-[#e3ba6f] text-[#3c000c] transition duration-300 group-hover:scale-105 group-hover:bg-[#ffecd1] sm:size-[66px]">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="relative z-[1] mb-0 font-serif text-[15px] font-normal leading-snug text-white sm:text-[18px]">
                {service.title}
              </h3>
            </motion.article>
          ))}
        </div>
        <motion.a
          className="group mx-auto mt-[42px] flex w-fit items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em] max-[760px]:mt-8"
          href="#contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          Talk through your plans <ArrowIcon />
        </motion.a>
      </div>
    </section>
  );
}

export function ClientTestimonialsSection() {
  const [activeReview, setActiveReview] = useState(0);
  const [reviewDirection, setReviewDirection] = useState<-1 | 1>(1);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setReviewDirection(1);
      setActiveReview((current) => (current + 1) % clientReviews.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const moveReview = (direction: -1 | 1) => {
    setReviewDirection(direction);
    setActiveReview((current) => (current + direction + clientReviews.length) % clientReviews.length);
  };
  const visibleReviews = [0, 1, 2].map((offset) => ({
    review: clientReviews[(activeReview + offset) % clientReviews.length],
    index: (activeReview + offset) % clientReviews.length,
  }));

  return (
    <section className="overflow-hidden bg-[#ffecd1] py-[100px] md:py-[120px]" id="client-testimonials">
      <div className="mx-auto w-[min(1120px,86%)] min-[761px]:max-[1000px]:w-[88%]">
        <motion.div
          className="mx-auto mb-12 max-w-[700px] text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#3c000c]">KIND WORDS, KEPT CLOSE</span>
          <h2 className="mb-4 mt-4 font-serif text-[clamp(38px,5vw,58px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]">
            Client testimonials, <em className="text-[#3c000c]">from the heart.</em>
          </h2>
          <p className="mx-auto mb-0 max-w-[570px] text-[12px] leading-[1.9] text-[#77736c]">
            The best part of what we do is helping couples enjoy the moments that matter. Replace
            these sample cards and ratings with approved client reviews before publishing.
          </p>
        </motion.div>
        <div className="mx-auto flex min-h-[360px] items-center gap-2 sm:min-h-[390px] sm:gap-4">
          <button
            aria-label="Previous client testimonial"
            className="z-20 grid size-9 shrink-0 place-items-center rounded-full border border-[#3c000c]/20 bg-white text-[#3c000c] shadow-sm transition hover:bg-[#3c000c] hover:text-white sm:size-11"
            onClick={() => moveReview(-1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">‹</span>
          </button>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex w-full gap-4 sm:gap-5">
              <AnimatePresence initial={false} mode="popLayout" custom={reviewDirection}>
                {visibleReviews.map(({ review, index }) => (
                  <motion.article
                    aria-current={index === activeReview ? "true" : undefined}
                    className="relative flex min-h-[280px] w-full shrink-0 flex-col rounded-md border border-[#e5e0d7] bg-white p-5 shadow-[0_16px_40px_rgba(37,35,31,0.08)] transition-shadow sm:min-h-[300px] sm:w-[calc((100%-1.25rem)/2)] sm:p-6 lg:w-[calc((100%-2.5rem)/3)] lg:p-7"
                    custom={reviewDirection}
                    initial={{ opacity: 0, x: reviewDirection * 55 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reviewDirection * -55 }}
                    key={review.category}
                    layout="position"
                    transition={{ duration: 0.35, ease: "easeInOut", layout: { duration: 0.4 } }}
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#3c000c]">
                        <span aria-hidden="true" className="font-sans text-[19px] font-bold tracking-[-0.1em]">
                          <span className="text-[#4285f4]">G</span>
                          <span className="text-[#ea4335]">o</span>
                          <span className="text-[#fbbc05]">o</span>
                          <span className="text-[#4285f4]">g</span>
                          <span className="text-[#34a853]">l</span>
                          <span className="text-[#ea4335]">e</span>
                        </span>
                        <span className="hidden sm:inline">Review</span>
                      </span>
                      <span aria-label="Sample five-star rating; replace with verified rating" className="shrink-0 text-[14px] tracking-[0.08em] text-[#fbbc04]">
                        ★★★★★
                      </span>
                    </div>
                    <span className="mb-3 text-[9px] tracking-[0.15em] text-[#3c000c]">
                      {review.category.toUpperCase()}
                    </span>
                    <p className="flex-1 font-serif text-[14px] leading-[1.65] text-[#3c000c] sm:text-[16px]">
                      “{review.quote}”
                    </p>
                    <div className="mt-5 border-t border-[#eeeae3] pt-4">
                      <span className="block text-[11px] font-semibold text-[#3c000c]">{review.author}</span>
                      <span className="mt-1 block text-[9px] text-[#77736c]">Sample testimonial — replace before publishing</span>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <button
            aria-label="Next client testimonial"
            className="z-20 grid size-9 shrink-0 place-items-center rounded-full border border-[#3c000c]/20 bg-white text-[#3c000c] shadow-sm transition hover:bg-[#3c000c] hover:text-white sm:size-11"
            onClick={() => moveReview(1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">›</span>
          </button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Choose a client testimonial">
          {clientReviews.map((review, index) => (
            <button
              aria-label={`Show testimonial: ${review.category}`}
              aria-current={index === activeReview ? "true" : undefined}
              className={`h-[7px] rounded-full transition-all duration-300 ${index === activeReview ? "w-6 bg-[#3c000c]" : "w-[7px] bg-[#c9c4b8] hover:bg-[#3c000c]"}`}
              key={review.category}
              onClick={() => {
                if (index !== activeReview) {
                  setReviewDirection(index > activeReview ? 1 : -1);
                  setActiveReview(index);
                }
              }}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OurResultsSection() {
  const [activeResult, setActiveResult] = useState(0);

  const moveResult = (direction: -1 | 1) => {
    setActiveResult((current) => (current + direction + workVideos.length) % workVideos.length);
  };

  const visibleResults = ([-1, 0, 1] as const).map((offset) => ({
    item: workVideos[(activeResult + offset + workVideos.length) % workVideos.length],
    offset,
  }));

  return (
    <section className="overflow-hidden bg-[#ffecd1] py-[100px] md:py-[125px]" id="results">
      <motion.div
        className="mx-auto w-[min(1120px,86%)] min-[761px]:max-[1000px]:w-[88%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
      >
        <div className="mx-auto mb-10 max-w-[700px] text-center sm:mb-14">
          <span className="block text-[9px] tracking-[0.2em] leading-[1.5] text-[#3c000c]">A GLIMPSE OF WHAT WE CREATE</span>
          <h2 className="mt-[17px] font-serif text-[clamp(38px,5vw,60px)] font-normal tracking-[-0.045em] leading-[1.1] text-[#3c000c]">
            Our results, made <em className="font-normal text-[#3c000c]">to be felt.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-[12px] leading-[1.9] text-[#77736c]">
            Every celebration is a collection of meaningful moments, thoughtful details and people brought together. Explore a preview of the atmosphere we can create for your day.
          </p>
        </div>
        <div className="relative mx-auto flex min-h-[clamp(330px,45vw,540px)] items-center justify-center">
          <div className="flex w-full items-center justify-center gap-[2%]">
            {visibleResults.map(({ item, offset }) => {
              const isActive = offset === 0;
              return (
                <motion.button
                  animate={{
                    opacity: isActive ? 1 : 0.62,
                    scale: isActive ? 1 : 0.86,
                    y: isActive ? 0 : 12,
                  }}
                  aria-label={`${isActive ? "Currently showing" : "Show"} ${item.title}`}
                  aria-pressed={isActive}
                  className={`group relative block min-w-0 overflow-hidden rounded-[5px] bg-[#3c000c] text-left text-white shadow-[0_18px_45px_rgba(37,35,31,0.18)] ${isActive ? "z-10 w-[64%]" : "w-[17%] cursor-pointer"}`}
                  key={`${item.title}-${offset}`}
                  onClick={() => {
                    if (!isActive) moveResult(offset);
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  type="button"
                >
                  <div className="relative aspect-[0.95] overflow-hidden sm:aspect-[1.25] lg:aspect-[1.65]">
                    <video
                      autoPlay={isActive}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loop
                      muted
                      playsInline
                      poster={item.poster}
                      preload={isActive ? "auto" : "none"}
                      ref={(element) => {
                        if (element && !isActive) element.pause();
                      }}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-6 lg:p-8">
                      <span className="mb-2 block text-[8px] tracking-[0.18em] text-white/75 sm:text-[9px]">WEDTEC EVENTS</span>
                      <span className="block font-serif text-[clamp(17px,3vw,34px)] leading-tight">{item.title}</span>
                      <span className="mt-2 block text-[9px] text-white/75 sm:text-[11px]">{item.location}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          <button
            aria-label="Previous result video"
            className="absolute left-0 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-[#3c000c]/20 bg-white/90 text-[#3c000c] shadow-sm transition hover:bg-[#3c000c] hover:text-white sm:left-[3%] sm:size-11"
            onClick={() => moveResult(-1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">‹</span>
          </button>
          <button
            aria-label="Next result video"
            className="absolute right-0 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-[#3c000c]/20 bg-white/90 text-[#3c000c] shadow-sm transition hover:bg-[#3c000c] hover:text-white sm:right-[3%] sm:size-11"
            onClick={() => moveResult(1)}
            type="button"
          >
            <span aria-hidden="true" className="text-xl leading-none">›</span>
          </button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Choose a result video">
          {workVideos.map((item, index) => (
            <button
              aria-label={`Show ${item.title}`}
              aria-current={index === activeResult ? "true" : undefined}
              className={`h-[7px] rounded-full transition-all duration-300 ${index === activeResult ? "w-6 bg-[#3c000c]" : "w-[7px] bg-[#c9c4b8] hover:bg-[#3c000c]"}`}
              key={item.title}
              onClick={() => setActiveResult(index)}
              type="button"
            />
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-[580px] text-center text-[10px] leading-[1.8] text-[#77736c]">
          These sample films are for design preview. We look forward to sharing WEDTEC celebrations as our portfolio grows.
        </p>
        <div className="mt-7 text-center">
          <a className="group inline-flex items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em]" href="#contact">
            Let&apos;s create your celebration <ArrowIcon />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="relative grid min-h-[430px] place-items-center overflow-hidden bg-[#3c000c] text-center text-white max-[760px]:min-h-[350px]">
      <div className="quote-image absolute inset-0 scale-[1.02]" />
      <div className="absolute inset-0 bg-[rgb(36_32_29/54%)]" />
      <motion.div
        className="relative z-[1] flex flex-col items-center p-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="mb-[17px] block text-[9px] tracking-[0.2em] leading-[1.5] text-white/75">THE WEDTEC WAY</span>
        <p className="mb-[25px] font-serif text-[clamp(39px,5vw,64px)] tracking-[-0.045em] text-white max-[760px]:text-[clamp(38px,10vw,56px)]">Beautifully considered. Joyfully yours.</p>
        <a className="inline-flex min-h-[50px] items-center justify-center gap-[25px] px-[22px] text-[10px] tracking-[0.07em] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 border border-white/70 hover:bg-white hover:text-[#3c000c]" href="#strategy">What matters to us <ArrowIcon /></a>
      </motion.div>
    </section>
  );
}

export function ProposalSection() {
  const proposals = [
    ["01", "Full-service planning", "From first ideas to the final farewell."],
    ["02", "Design & vendor guidance", "A clear creative direction and the right people around you."],
    ["03", "Wedding-weekend coordination", "A steady, detail-minded presence as your plans come together."],
  ];

  return (
    <section className="grid grid-cols-[0.9fr_1.1fr] items-center gap-[10%] pt-[135px] pb-[135px] max-[760px]:grid-cols-1 max-[760px]:gap-[38px] max-[760px]:pt-[90px] max-[760px]:pb-[95px] min-[761px]:max-[1000px]:grid-cols-1 min-[761px]:max-[1000px]:gap-9 min-[761px]:max-[1000px]:pt-[95px] min-[761px]:max-[1000px]:pb-[100px] mx-auto w-[min(1120px,82%)] max-[760px]:w-[86%] min-[761px]:max-[1000px]:w-[88%]" id="celebrations">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
      >
        <span className="block text-[9px] tracking-[0.2em] leading-[1.5]">A CELEBRATION THAT FITS</span>
        <h2 className="my-[18px] mb-[22px] font-serif text-[clamp(38px,4.5vw,55px)] font-normal tracking-[-0.045em] leading-[1.08] text-[#3c000c] max-[760px]:text-[clamp(40px,10vw,55px)]">Start with what <em className="font-normal text-[#3c000c]">you need.</em></h2>
        <p className="mb-[25px] max-w-[430px] text-[12px] leading-[1.9] text-[#77736c]">
          Some couples want a team beside them from the first venue visit. Others have the big
          pieces in place and need a steady hand to bring it all together. We shape our support
          around your celebration.
        </p>
        <a className="group inline-flex flex-[0_0_auto] items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em]" href="#contact">Find your starting point <ArrowIcon /></a>
      </motion.div>
      <motion.div
        className="border-t border-[#d5d0c6]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {proposals.map(([number, title, description]) => (
          <motion.a className="grid min-h-[103px] grid-cols-[36px_1fr_20px] items-center gap-[18px] border-b border-[#d5d0c6] transition-[padding] duration-[180ms] hover:px-[7px]" href="#contact" key={number} variants={reveal}>
            <span className="self-start pt-[27px] text-[9px] tracking-[0.15em] text-[#3c000c]">{number}</span>
            <span className="flex flex-col gap-[7px]"><strong className="font-serif text-[21px] font-normal">{title}</strong><small className="text-[10px] leading-[1.6] text-[#77736c]">{description}</small></span>
            <ArrowIcon diagonal />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

export function OurGallerySection() {
  return (
    <section className="bg-[#ffecd1] py-[100px] md:py-[125px]" id="gallery">
      <div className="mx-auto w-[min(1240px,88%)]">
        <motion.div
          className="mx-auto mb-10 max-w-[700px] text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#3c000c]">A COLLECTION OF CELEBRATIONS</span>
          <h2 className="mt-[17px] font-serif text-[clamp(38px,5vw,60px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]">
            Our gallery of <em className="text-[#3c000c]">moments.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[590px] text-[12px] leading-[1.9] text-[#77736c]">
            From heartfelt wedding moments to lively events and unforgettable nights on the dance floor, explore the celebrations and details that inspire what we do.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {galleryImages.map((item, index) => (
            <motion.article
              className="group relative"
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
            >
              <div className={`relative overflow-hidden rounded-sm bg-[#d5d0c6] shadow-[0_8px_22px_rgba(37,35,31,0.08)] ${index % 5 === 1 || index % 5 === 3 ? "aspect-[0.78]" : "aspect-[0.92]"} sm:aspect-[0.86]`}>
                <Image
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:scale-[1.08]"
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 23vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-1 flex-col gap-1 p-3 transition-transform duration-300 group-hover:translate-y-0 sm:p-5">
                  <span className="text-[8px] tracking-[0.16em] text-white/80">{item.category}</span>
                  <h3 className="mb-0 font-serif text-[16px] font-normal leading-tight text-white sm:text-[20px]">{item.title}</h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  const values = [
    ["01", "Your priorities lead", "We build around what matters to you, not a one-size-fits-all checklist."],
    ["02", "Thoughtful choices", "We help you compare options clearly and make decisions with confidence."],
    ["03", "One connected plan", "We keep the details, suppliers and schedule moving in the same direction."],
  ];

  return (
    <section className="grid grid-cols-[0.85fr_1.15fr] gap-[9%] pt-[130px] pb-[135px] max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:pt-[90px] max-[760px]:pb-[95px] min-[761px]:max-[1000px]:grid-cols-1 min-[761px]:max-[1000px]:gap-9 min-[761px]:max-[1000px]:pt-[95px] min-[761px]:max-[1000px]:pb-[100px] mx-auto w-[min(1120px,82%)] max-[760px]:w-[86%] min-[761px]:max-[1000px]:w-[88%]" id="approach">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
      >
        <span className="block text-[9px] tracking-[0.2em] leading-[1.5]">WHY WEDTEC EVENTS</span>
        <h2 className="my-[18px] mb-[22px] font-serif text-[clamp(39px,4.4vw,54px)] font-normal tracking-[-0.045em] leading-[1.08] text-[#3c000c] max-[760px]:text-[clamp(40px,10vw,55px)]">Care in the details. <em className="font-normal text-[#3c000c]">Calm in the moments.</em></h2>
        <p className="mb-[25px] max-w-[430px] text-[12px] leading-[1.9] text-[#77736c]">
          Good planning is more than a beautiful set-up. It is the feeling that everything has
          been thought through, with your people and priorities at the heart of it.
        </p>
      </motion.div>
      <div className="grid grid-cols-1">
        {values.map(([number, title, text], index) => (
          <motion.article
            className="grid grid-cols-[35px_1fr] grid-rows-[auto_auto] gap-x-[13px] border-t border-[#d5d0c6] py-5"
            key={number}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
          >
            <span className="row-span-2 pt-[5px] text-[9px] tracking-[0.16em] text-[#3c000c]">{number}</span>
            <h3 className="mb-[7px] font-serif text-[22px] font-normal">{title}</h3>
            <p className="mb-0 max-w-[430px] text-[11px] leading-[1.85] text-[#77736c]">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#ffecd1] py-[100px] md:py-[125px]" id="faq">
      <div className="mx-auto grid w-[min(1120px,86%)] grid-cols-[0.8fr_1.2fr] items-start gap-[8%] max-[760px]:grid-cols-1 max-[760px]:gap-9 min-[761px]:max-[1000px]:grid-cols-1 min-[761px]:max-[1000px]:gap-10">
        <motion.div
          className="rounded-md border border-white/80 bg-white p-7 shadow-[0_12px_35px_rgba(37,35,31,0.07)] sm:p-9"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] leading-[1.5] text-[#3c000c]">HERE TO MAKE IT EASIER</span>
          <h2 className="my-[18px] mb-[22px] font-serif text-[clamp(39px,4.5vw,54px)] font-normal tracking-[-0.045em] leading-[1.08] text-[#3c000c] max-[760px]:text-[clamp(40px,10vw,55px)]">Good questions, <em className="font-normal text-[#3c000c]">clear answers.</em></h2>
          <p className="mb-[25px] max-w-[430px] text-[12px] leading-[1.9] text-[#77736c]">Planning a celebration comes with plenty to think about. Here are a few helpful answers to get you started.</p>
          <div className="mb-6 h-px w-12 bg-[#e3ba6f]" />
          <p className="mb-[25px] max-w-[430px] text-[12px] leading-[1.9] text-[#77736c]">Still wondering about something? We’re always happy to talk it through.</p>
          <a className="group inline-flex flex-[0_0_auto] items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em]" href="#contact">Ask us directly <ArrowIcon /></a>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.details
              className="group rounded-md border border-[#eeeae2] bg-white px-5 shadow-[0_8px_24px_rgba(37,35,31,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(37,35,31,0.1)] sm:px-7"
              key={faq.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 py-5 font-serif text-[17px] text-[#3c000c] outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-[#3c000c] focus-visible:ring-offset-4 sm:min-h-[80px] sm:text-[19px] [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-4">
                  <span className="pt-1 font-sans text-[9px] tracking-[0.12em] text-[#3c000c]">0{index + 1}</span>
                  {faq.question}
                </span>
                <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-[#ffecd1] text-[#3c000c] transition-colors group-open:bg-[#3c000c] group-open:text-white" aria-hidden="true">
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current transition-transform duration-200 group-open:rotate-90" />
                </span>
              </summary>
              <p className="mb-0 max-w-[570px] border-t border-[#eeeae2] pb-6 pt-4 pl-8 text-[12px] leading-[1.9] text-[#77736c] sm:pl-9">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlanStrategySection() {
  return (
    <section className="bg-[#ffecd1] py-[95px] md:py-[120px]" id="strategy">
      <div className="mx-auto w-[min(1180px,88%)]">
        <motion.div
          className="mx-auto mb-10 max-w-[700px] text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#3c000c]">A CLEAR PATH FROM FIRST HELLO TO THE BIG DAY</span>
          <h2 className="mt-4 font-serif text-[clamp(38px,5vw,60px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]">
            Our plan, <em className="text-[#3c000c]">your celebration.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[590px] text-[12px] leading-[1.9] text-[#77736c]">
            Thoughtful planning should feel exciting, not overwhelming. Our simple six-step approach keeps you informed, supported, and in control from the first conversation through the final moments.
          </p>
        </motion.div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px bg-[#e3ba6f]/65 lg:bottom-auto lg:left-8 lg:right-8 lg:top-8 lg:h-px lg:w-auto"
          />
          <div className="grid gap-6 lg:grid-cols-6 lg:gap-4">
          {strategySteps.map((step, index) => (
            <motion.article
              className="group relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <span className="relative z-[1] grid size-10 shrink-0 place-items-center rounded-full border border-[#e3ba6f] bg-[#ffecd1] text-[#3c000c] shadow-[0_0_0_6px_#ffecd1] transition duration-300 group-hover:scale-110 group-hover:bg-[#e3ba6f] group-hover:text-[#3c000c] lg:mb-6 lg:size-16 lg:shadow-[0_0_0_8px_#ffecd1]">
                <span className="hidden lg:block"><StrategyIcon name={step.icon} /></span>
                <span className="font-sans text-[10px] font-semibold tracking-[0.08em] lg:hidden">0{index + 1}</span>
              </span>
              <div className="min-w-0 flex-1 rounded-md border border-[#e3ba6f]/35 bg-white p-4 shadow-[0_5px_14px_rgba(70,45,48,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_rgba(70,45,48,0.11)] lg:min-h-[174px] lg:w-full lg:flex-none lg:p-5">
                <span className="mb-1 block text-[8px] tracking-[0.16em] text-[#3c000c]">STEP 0{index + 1}</span>
                <h3 className="mb-1 font-serif text-[20px] font-normal text-[#41464d] sm:text-[23px]">{step.title}</h3>
                <p className="mb-0 text-[11px] leading-[1.75] text-[#686d73] sm:text-[13px]">{step.description}</p>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inquiryDetails = Array.from(formData.entries())
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");
    const subject = encodeURIComponent("Wedding & Event Booking Inquiry");
    const body = encodeURIComponent(inquiryDetails);

    window.location.href = `mailto:hello@wedtecevents.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="bg-[#ffecd1] py-[90px] md:py-[115px]" id="contact">
      <div className="mx-auto grid w-[min(1120px,86%)] items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[9%]">
        <motion.div
          className="pt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
        >
          <span className="block text-[9px] tracking-[0.2em] text-[#3c000c]">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2 className="mt-5 max-w-[500px] font-serif text-[clamp(42px,5vw,62px)] font-normal leading-[1.05] tracking-[-0.05em] text-[#3c000c]">
            Let&apos;s plan <em className="text-[#3c000c]">something wonderful.</em>
          </h2>
          <p className="mt-5 max-w-[430px] text-[13px] leading-[1.9] text-[#68645e]">
            Tell us a little about the celebration you have in mind. Share your date, guest count and the details you know so far, and our team can get to know what matters most to you.
          </p>
          <div className="mt-9 border-t border-[#c9c4b8] pt-6">
            <span className="block text-[9px] tracking-[0.16em] text-[#8a8177]">EMAIL US DIRECTLY</span>
            <a className="mt-2 inline-block text-[14px] text-[#3c000c] transition-colors hover:text-[#3c000c]" href="mailto:hello@wedtecevents.com">
              hello@wedtecevents.com
            </a>
          </div>
          <p className="mt-8 max-w-[380px] font-serif text-[20px] leading-[1.5] text-[#77736c]">
            Thoughtful celebrations begin with a conversation.
          </p>
        </motion.div>

        <motion.form
          className="rounded-md border border-white/70 bg-white p-5 shadow-[0_16px_45px_rgba(37,35,31,0.09)] sm:p-8 lg:p-10"
          onSubmit={handleInquirySubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h3 className="mb-2 font-serif text-[28px] font-normal text-[#3c000c]">Tell us about your plans</h3>
          <p className="mb-7 text-[11px] leading-[1.8] text-[#77736c]">Fields marked with * are required. Submitting opens your email app with the inquiry details ready to send.</p>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Your name *
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" autoComplete="name" name="Name" placeholder="Full name" required />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Email address *
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" autoComplete="email" name="Email" placeholder="you@example.com" required type="email" />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Phone number
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" autoComplete="tel" name="Phone" placeholder="Your phone number" type="tel" />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Event type *
              <select className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" defaultValue="" name="Event type" required>
                <option disabled value="">Choose an event type</option>
                <option>Wedding</option>
                <option>Wedding celebration / reception</option>
                <option>Engagement</option>
                <option>Private event</option>
                <option>Corporate event</option>
                <option>Other celebration</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Event date
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" name="Event date" type="date" />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c]">
              Estimated guest count
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" min="1" name="Guest count" placeholder="e.g. 150" type="number" />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c] sm:col-span-2">
              Event location or venue
              <input className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" name="Location or venue" placeholder="City, venue, or destination" />
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c] sm:col-span-2">
              What services are you interested in?
              <select className="h-11 rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 text-[12px] font-normal tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" defaultValue="" name="Services">
                <option value="">Select a service</option>
                <option>Full-service planning</option>
                <option>Venue selection</option>
                <option>Décor and design</option>
                <option>Entertainment and DJ</option>
                <option>Destination wedding</option>
                <option>Not sure yet / multiple services</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-[10px] font-medium tracking-[0.04em] text-[#3c000c] sm:col-span-2">
              Tell us more about your plans *
              <textarea className="min-h-[110px] resize-y rounded-sm border border-[#e4dfd6] bg-[#fcfbf8] px-3 py-3 text-[12px] font-normal leading-[1.7] tracking-normal text-[#3c000c] outline-none transition focus:border-[#3c000c] focus:ring-2 focus:ring-[#3c000c]/15" name="About your plans" placeholder="Your ideas, priorities, and anything else you'd like us to know..." required />
            </label>
          </div>

          <button className="group mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-4 bg-[#3c000c] px-6 text-[10px] tracking-[0.08em] text-white transition-colors hover:bg-[#3c000c] sm:w-auto" type="submit">
            Prepare my inquiry <ArrowIcon />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="min-h-[120px] bg-[#090908] text-white px-[7.3%] py-[53px] pb-[22px] max-[760px]:min-h-0 max-[760px]:px-[7%] max-[760px]:pt-[37px] max-[760px]:pb-5">
      <div className="grid grid-cols-[1.2fr_1fr_0.8fr_1fr] gap-[35px] pb-[43px] max-[760px]:grid-cols-2 max-[760px]:gap-[30px_18px] max-[760px]:pb-8 min-[761px]:max-[1000px]:grid-cols-2">
        <a aria-label="WEDTEC EVENTS home" className="inline-flex flex-col items-center gap-[5px] justify-self-start self-start" href="#home">
          <BrandLogo className="h-auto w-[240px] max-sm:w-[158px]" />
        </a>
        <p className="m-0 font-serif text-[18px] leading-[1.5] text-white/65 tracking-[0.04em] max-[760px]:self-start max-[760px]:text-base">Thoughtful celebrations.<br />Lasting memories.</p>
        <div className="flex min-w-0 flex-col items-start gap-[13px] max-[760px]:gap-3">
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#services">Our services</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#work">Our work</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#gallery">Gallery</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#faq">FAQs</a>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-[13px] max-[760px]:gap-3">
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#about">About WEDTEC</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#strategy">Our plan & strategy</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="#contact">Get in touch</a>
          <a className="text-[9px] text-white/70 transition-colors hover:text-[#e3ba6f] max-[760px]:[overflow-wrap:anywhere] max-[760px]:leading-[1.5]" href="mailto:hello@wedtecevents.com">hello@wedtecevents.com</a>
          <div className="mt-2">
            <span className="mb-3 block text-[8px] tracking-[0.16em] text-white/50">FOLLOW OUR JOURNEY</span>
            <div className="flex items-center gap-2">
              <a aria-label="Instagram (add WEDTEC profile link)" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[#e3ba6f] hover:text-[#e3ba6f]" href="https://www.instagram.com/" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
                  <rect height="16" rx="4" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="4" />
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
              <a aria-label="Facebook (add WEDTEC page link)" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[#e3ba6f] hover:text-[#e3ba6f]" href="https://www.facebook.com/" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4Z" />
                </svg>
              </a>
              <a aria-label="Pinterest (add WEDTEC profile link)" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[#e3ba6f] hover:text-[#e3ba6f]" href="https://www.pinterest.com/" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.1 3a9 9 0 0 0-3.3 17.4c0-.7 0-1.6.2-2.4l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2-.8 3.1-.2.9.4 1.6 1.3 1.6 1.6 0 2.8-1.7 2.8-4.2 0-2.2-1.6-3.7-3.8-3.7-2.6 0-4.1 1.9-4.1 3.9 0 .8.3 1.6.7 2 .2.2.2.3.1.6l-.3 1c-.1.3-.3.4-.6.2-1.1-.5-1.7-2-1.7-3.2 0-2.6 1.9-5.1 5.6-5.1 3 0 5.3 2.2 5.3 5.1 0 3-1.9 5.5-4.6 5.5-.9 0-1.8-.5-2.1-1l-.6 2.4c-.2.9-.8 1.8-1.2 2.4.9.3 1.8.5 2.8.5a9 9 0 0 0 0-18Z" />
                </svg>
              </a>
              <a aria-label="YouTube (add WEDTEC channel link)" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-[#e3ba6f] hover:text-[#e3ba6f]" href="https://www.youtube.com/" rel="noreferrer" target="_blank">
                <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/20 pt-[17px] text-[8px] tracking-[0.09em] text-white/55 max-[760px]:text-[7px]">
        <span>© WEDTEC EVENTS</span>
        <nav aria-label="Legal policies" className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="transition-colors hover:text-[#e3ba6f]" href="/privacy-policy">Privacy policy</a>
          <a className="transition-colors hover:text-[#e3ba6f]" href="/terms-and-conditions">Terms & conditions</a>
          <a className="transition-colors hover:text-[#e3ba6f]" href="/cookie-policy">Cookie policy</a>
        </nav>
        <a className="transition-colors hover:text-[#e3ba6f]" href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
