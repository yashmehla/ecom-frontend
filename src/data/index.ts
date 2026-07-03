import type { Product, Review, HeroData, StatItem, NavItem, FooterColumn } from '@/types'

// All images are from Unsplash (free to use).
// Format: https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={w}&q=80

const U = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const SITE = {
  name: 'NOCTURNE',
  tagline: 'wear the night',
  description: 'Small-batch drops, released after dark. Once it\'s gone, it\'s gone.',
}

export const NAV: NavItem[] = [
  { label: 'New Drops', href: '#products' },
  { label: 'Footwear',  href: '#products' },
  { label: 'Outerwear', href: '#products' },
  { label: 'Limited',   href: '#products' },
]

export const HERO: HeroData = {
  dropNumber: '014',
  eyebrow: 'Drop 014 — Midnight Run',
  line1: 'After dark',
  line2: 'is our season.',
  sub: 'Six pieces. Released midnight. No restock.',
  cta: 'Enter the drop',
  // Dark editorial fashion — dramatic contrast, moody lighting
  image: U('1581803118522-7b72a51f8d5c', 800, 1060),
  countdownSeconds: 38 * 3600 + 24 * 60 + 9,
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Vantablack Runner',
    category: 'Footwear',
    price: 218,
    tag: 'New',
    image: U('1542291026-7eec264c27ff', 600, 800),
    hoverImage: U('1542291026-7eec264c27ff', 600, 800),
  },
  {
    id: 2,
    name: 'Static Bomber',
    category: 'Outerwear',
    price: 340,
    originalPrice: 410,
    tag: '−17%',
    image: U('1551028719-00167b16eac5', 600, 800),
  },
  {
    id: 3,
    name: 'Voltage Hoodie',
    category: 'Outerwear',
    price: 168,
    tag: 'New',
    image: U('1556821840-3a63f8550d44', 600, 800),
  },
  {
    id: 4,
    name: 'Phantom Sling',
    category: 'Bags',
    price: 122,
    originalPrice: 150,
    image: U('1548036161-65f7b3d5a6d1', 600, 800),
  },
]

export const REVIEWS: Review[] = [
  {
    id: 1,
    text: 'Sold out in nine minutes. The fit is unreal — photographs exactly like the site.',
    handle: '@low.frequency',
    stars: 5,
    verified: true,
  },
  {
    id: 2,
    text: 'First brand that actually photographs true-to-color in low light. The lavender stitching is not a gimmick.',
    handle: '@midnight.archive',
    stars: 5,
    verified: true,
  },
  {
    id: 3,
    text: 'Drop alerts are merciless — thirty seconds late and the Bomber was gone. Worth setting an alarm for.',
    handle: '@ghostlane',
    stars: 4,
    verified: true,
  },
]

export const STATS: StatItem[] = [
  { value: '12',    label: 'Drops per year' },
  { value: '≤ 8',  label: 'Pieces per drop' },
  { value: 'Never', label: 'Restock policy' },
  { value: '41 k',  label: 'Drop members' },
]

export const MARQUEE_ITEMS = [
  'Footwear', 'Outerwear', 'Tech Layers', 'Headwear',
  'Accessories', 'Limited', 'Eyewear', 'Bags',
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'New Drops', href: '#' },
      { label: 'Footwear',  href: '#' },
      { label: 'Outerwear', href: '#' },
      { label: 'Accessories', href: '#' },
    ],
  },
  {
    heading: 'Info',
    links: [
      { label: 'Shipping',  href: '#' },
      { label: 'Returns',   href: '#' },
      { label: 'About',     href: '#' },
      { label: 'Contact',   href: '#' },
    ],
  },
]

// Feature strip image — dark urban streetscape
export const FEATURE_IMAGE = U('1477959858617-67f85cf4f1df', 1400, 600)
